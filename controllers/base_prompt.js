const profile_function_prompt = require('../prompts/profile_dict.js');
const projects_function_prompt = require('../prompts/projects_dict.js');
const relevancy_score_function_prompt = require('../prompts/relevancy_score_dict.js');
const academic_experience_function_prompt = require('../prompts/academic_exp_dict.js');
const professional_experience_function_prompt = require('../prompts/professional_exp_dict.js');
const ai_comment_function_prompt = require('../prompts/ai_comment_dict.js');


const base_function_prompt = [
    {
        "name": "applicant_details_parser",
        "description": "Parse all the essential details from the text extracted from the resume of the applicant.",
        "parameters": {
            "type": "object",
            "properties": {
                "profile": profile_function_prompt,
                "college": academic_experience_function_prompt,
                "projects": projects_function_prompt,
                "professional_experiences": professional_experience_function_prompt,
                "relevance": relevancy_score_function_prompt,
                "ai_comment": ai_comment_function_prompt,

            },
        },
    }
];
module.exports = base_function_prompt;

