import os

from dotenv import load_dotenv
from langchain_groq import ChatGroq

from backend.schemas.lead_schema import Lead
from backend.schemas.qualification_schema import QualificationResult

load_dotenv()


llm = ChatGroq(
    model="openai/gpt-oss-120b",
    temperature=0,
    api_key=os.getenv("GROQ_API_KEY"),
)

structured_llm = llm.with_structured_output(QualificationResult)


def qualify_lead(lead: Lead) -> QualificationResult:

    prompt = f"""
You are a sales lead qualification assistant.

Analyze the following lead:

Name: {lead.name}
Email: {lead.email}
Company: {lead.company}
Job Title: {lead.job_title}
Message: {lead.message}

Evaluate the lead using these factors:

1. company_fit: How well does this lead appear to match the target customer profile? (0-10)

2. need: How clearly does the lead have a problem or need that our product/service can solve? (0-10)

3. intent: How strong is the lead's buying intent? (0-10)

4. budget_fit: How suitable does the stated budget appear to be? (0-10)

5. authority: How likely is the person to have decision-making authority? (0-10)

6. urgency: How urgent is the customer's need? (0-10)

Important:
- Do not calculate an overall score.
- Do not invent information that is not present.
- Base each evaluation only on the available lead information.
- Return a concise reason explaining the evaluation.
"""

    result = structured_llm.invoke(prompt)

    return result


def calculate_score(result: QualificationResult) -> int:

    score = (
        (result.company_fit / 10) * 20
        + (result.need / 10) * 20
        + (result.intent / 10) * 20
        + (result.budget_fit / 10) * 15
        + (result.authority / 10) * 10
        + (result.urgency / 10) * 15
    )

    return round(score)



def get_category(score: int) -> str:

    if score >= 80:
        return "HOT"

    if score >= 50:
        return "WARM"

    return "COLD"