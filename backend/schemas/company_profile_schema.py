from pydantic import BaseModel


class CompanyProfile(BaseModel):
    company_name: str
    description: str
    products: list[str]
    target_industries: list[str]
    min_budget: float
    max_budget: float
    min_company_size: int
    max_company_size: int
    target_job_titles: list[str]