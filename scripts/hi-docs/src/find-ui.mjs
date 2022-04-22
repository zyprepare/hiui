import Path from 'path'
import globAsync from 'fast-glob'

export async function findUI(baseURL) {
  const componentPkgFiles = await findComponentPkgFiles(baseURL)

  const componentInfo = getComponentInfo(componentPkgFiles, baseURL)

  return componentInfo
}

async function findComponentPkgFiles(baseURL) {
  const tsFiles = await globAsync('*/package.@(json)', {
    cwd: Path.join(baseURL),
    ignore: ['**/node_modules/**'],
  })

  return tsFiles
}

function getComponentInfo(componentPkgFiles, baseURL) {
  return componentPkgFiles.map((pkgFile) => {
    const componentName = pkgFile.split('/')[0]
    const pkgFilepath = Path.join(baseURL, pkgFile)

    // @Meta Component
    return {
      dir: Path.dirname(pkgFilepath),
      name: componentName,
    }
  })
}
