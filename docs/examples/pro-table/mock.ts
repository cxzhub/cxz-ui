export function delay(timestamp: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timestamp)
  })
}

export async function getMock(keys: string[], page: number, pageSize: number) {
  await delay(300)
  const pageCount = Math.floor(Math.random() * 5)
  function createObj(index: number) {
    const newObj: Record<string, string> = {}
    for (let i = 0; i < keys.length; i++) {
      newObj[keys[i]] = `${keys[i]}-label-${index}`
    }
    return newObj
  }

  return {
    data: {
      data: new Array(pageSize).fill(null).map((_, index) => createObj(index)),
      page,
      pageCount,
      itemCount: pageCount * pageSize
    }
  }
}
