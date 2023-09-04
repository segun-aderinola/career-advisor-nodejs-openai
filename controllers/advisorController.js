const dotenv = require("dotenv");
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


const generateAdvice = async (req, res, next) => {
  try {
    const { message, experience, industry, negotiationSKill } = req.body;
    
    if (
      message == "" ||
      experience == "" ||
      industry == "" ||
      negotiationSKill == ""
    ) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }
    else if(message.length < 10) {
        return res.status(400).json({
            success: false,
            error: "Please kindly provide a detailed promptMessage to help me assist you.",
          });
    }
    
    else {
      const promptMessage =
        message +
        " with " +
        experience +
        " years experience" +
        " in " +
        industry +
        " and " +
        negotiationSKill +
        " negotiation skill";

        const moderation = await openai.createModeration({
        input: message,
      });
      const result = moderation.data.results;
      console.log(result);
      if (result[0].flagged === true) {
        return res.status(400).json({
          success: false,
          message: 'This promptMessage is flagged. Please provide a valid promptMessage',
        });
      } else {
        const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: promptMessage }],
        });

        
        const apiResponse = response.data.choices[0].message;
        const responseContent = apiResponse.content;

        const arr =
          typeof responseContent === "string"
            ? responseContent.split("\n")
            : [];

        const filtered = arr.filter(function (el) {
          return el != "";
        });

        if (filtered) {
            
            if(filtered[0].includes('As an AI language model') == true) {
               
                filtered.splice(0,1);
                next();
            }
            console.log(filtered);
          return res.status(200).json({
            success: true,
            message: filtered,
          });
        
        } else {
          return res.status(401).json({
            success: false,
            message: "Unable to get response from OpenAi",
          });
        }
      }
    }
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: err.message
    });
  }
};


module.exports = { generateAdvice };
