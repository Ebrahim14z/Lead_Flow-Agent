import os

from dotenv import load_dotenv
from langchain_groq import ChatGroq

from backend.agent.prompt import AGENT_SYSTEM_PROMPT
from backend.agent.tools import TOOLS

from backend.schemas.agent_schema import AgentDecision


load_dotenv()


llm = ChatGroq(
    model="openai/gpt-oss-120b",
    temperature=0,
    api_key=os.getenv("GROQ_API_KEY"),
)


llm_with_tools = llm.bind_tools(
    TOOLS
)


tools_by_name = {
    tool.name: tool
    for tool in TOOLS
}


def run_agent(lead_id: int) -> AgentDecision:

    messages = [
        {
            "role": "system",
            "content": AGENT_SYSTEM_PROMPT,
        },

        {
            "role": "user",
            "content": f"""
Qualify lead {lead_id}.

Follow the required workflow:

1. Get the lead.
2. Get the company profile.
3. Qualify the lead.
4. Save the qualification.
5. Return the final result.
""",
        },
    ]

    final_result = None

    # Agent loop
    for _ in range(8):

        response = llm_with_tools.invoke(
            messages
        )

        messages.append(
            response
        )

        # If the model has no more tools to call,
        # the workflow is finished.
        if not response.tool_calls:
            break

        # Execute tools requested by the Agent

        for tool_call in response.tool_calls:

            tool_name = tool_call["name"]

            tool_args = tool_call["args"]

            tool_id = tool_call["id"]

            tool = tools_by_name.get(
                tool_name
            )

            # Tool does not exist

            if tool is None:

                tool_result = {
                    "error": f"Tool '{tool_name}' not found."
                }

            else:

                try:

                    tool_result = tool.invoke(
                        tool_args
                    )

                    # Detect successful final save

                    if (
                        isinstance(tool_result, dict)
                        and "qualification" in tool_result
                    ):

                        final_result = tool_result

                except Exception as e:

                    tool_result = {
                        "error": (
                            f"Tool execution failed: {str(e)}"
                        )
                    }

            # Send tool result back to the model

            messages.append(
                {
                    "role": "tool",
                    "tool_call_id": tool_id,
                    "content": str(tool_result),
                }
            )

    # Make sure the Agent actually completed
    # the qualification workflow.

    if final_result is None:

        raise RuntimeError(
            "Agent finished without saving a qualification result."
        )

    qualification = final_result[
        "qualification"
    ]

    return AgentDecision(
        lead_id=lead_id,

        score=qualification["score"],

        category=qualification["category"],

        reason=qualification["reason"],

        action="Lead qualified and qualification result saved.",
    )