'use strict'

function initReplyText(client) {
  const replyText = (token, texts) => {
    texts = Array.isArray(texts) ? texts : [texts];
    return client.replyMessage(
      token,
      texts.map((text) => ({ type: 'text', text }))
    );
  };
  return replyText
}


module.exports = {
  initReplyText
}