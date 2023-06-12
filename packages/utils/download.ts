export function download(fileUrl: string, fileName?: string) {
  const pathArr = fileUrl.split('/')
  const defaultFileName = pathArr[pathArr.length - 1]

  if ((window as any).fetch) {
    fetch(fileUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const href = window.URL.createObjectURL(blob)
        downloadFile(href, fileName || defaultFileName)
      })
  } else {
    downloadFile(fileUrl, fileName || defaultFileName)
  }
}

export function downloadFile(href: string, filename: string) {
  // create "a" HTML element with href to file & click
  const link = document.createElement('a')
  link.target = '__blank'
  link.href = href
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()

  // clean up "a" element & remove ObjectURL
  document.body.removeChild(link)
  URL.revokeObjectURL(href)
}
