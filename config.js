const dev = {
  apiGateway: {
    REGION: 'us-east-1',
    URL: "https://ffua5y66xh.execute-api.us-east-1.amazonaws.com/dev",
  }
};

const prod = {
  apiGateway: {
    REGION: 'us-east-1',
    URL: "https://6igea4twhh.execute-api.us-east-1.amazonaws.com/prod",
  }
};

// Default to dev if not set
const config = process.env.STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  // MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};