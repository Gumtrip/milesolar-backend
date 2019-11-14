export function dataTransform(rawData) {
  let data
  if (rawData.data === undefined) {
    data = JSON.parse(rawData.request.response)
  } else {
    data = rawData.data
  }
  return data
}

export function errorMessage(data) {
  const validationErrors = data.errors
  let messages = ''
  if (validationErrors) {
    for (const item in validationErrors) {
      for (let i = 0; i < validationErrors[item].length; i++) {
        messages += validationErrors[item][i]
      }
    }
  } else {
    messages = data.message
  }
  return messages
}
