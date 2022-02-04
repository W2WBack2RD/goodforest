import agent from 'superagent';
import superagentAbsolute from 'superagent-absolute';

export const request = process.env.NODE_ENV === 'development' ? superagentAbsolute(agent)('http://localhost:3000') : agent;