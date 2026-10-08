import os

from dotenv import load_dotenv
from langchain_groq import ChatGroq

from backend.schemas.lead_schema import Lead
from backend.schemas.qualification_schema import QualificationResult
from backend.schemas.company_profile_schema import CompanyProfile


load_dotenv()


llm = ChatGroq(
    model="openai/gpt-oss-120b",
    temperature=0,
    api_key=os.getenv("GROQ_API_KEY"),
)

structured_llm = llm.with_structured_output(QualificationResult)


def qualify_lead(
    lead: Lead,
    company_profile: CompanyProfile
) -> QualificationResult:

    prompt = f"""
You are a sales lead qualification assistant.

Your job is to evaluate a potential customer based on:

1. The lead information.
2. The company profile and Ideal Customer Profile (ICP).

Do not invent information that is not provided.


====================
COMPANY PROFILE
====================

Company Name:
{company_profile.company_name}

Description:
{company_profile.description}

Products / Services:
{company_profile.products}

Target Industries:
{company_profile.target_industries}

Budget Range:
${company_profile.min_budget} - ${company_profile.max_budget}

Target Company Size:
{company_profile.min_company_size} - {company_profile.max_company_size} employees

Target Job Titles:
{company_profile.target_job_titles}


====================
LEAD INFORMATION
====================

Name:
{lead.name}

Email:
{lead.email}

Company:
{lead.company}

Job Title:
{lead.job_title}

Industry:
{lead.industry}

Company Size:
{lead.company_size} employees

Budget:
${lead.budget}

Timeline:
{lead.timeline}

Need:
{lead.need}

Message:
{lead.message}


====================
QUALIFICATION FACTORS
====================

1. company_fit:
How well does the lead's company match the target
industry and target company size?

Compare the lead against the company's ICP.

Score from 0 to 10.

2. need:
How clearly does the lead have a problem or need that
the company's products/services can solve?

Score from 0 to 10.

3. intent:
How strong is the lead's buying intent?

Look for signals such as:
- actively evaluating solutions
- requesting information
- requesting a meeting
- discussing implementation
- comparing providers

Score from 0 to 10.

4. budget_fit:
How well does the lead's budget match the company's
defined budget range?

Use the company profile budget range as the reference.

Score from 0 to 10.

5. authority:
How likely is the lead to have decision-making authority
based on their job title?

Compare the job title with the company's target job titles.

Score from 0 to 10.

6. urgency:
How urgent is the lead's need based on the stated timeline?

Score from 0 to 10.


====================
IMPORTANT RULES
====================

- Do not calculate an overall score.
- Do not invent information.
- Use the company profile as the reference for company_fit,
  budget_fit, and authority.
- Do not assume that a larger company is automatically better.
- Do not assume that a higher budget is automatically better.
- A budget outside the company's range should negatively
  affect budget_fit.
- An industry outside the target industries should negatively
  affect company_fit.
- A company size outside the target range should negatively
  affect company_fit.
- A job title matching the target roles should positively
  affect authority.
- Return a concise explanation of the qualification.
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