type BlockPropsNode = {
    children: any[],
    markDefs: any[],
    style: string,
    _key: string,
    _type: "block"
}

export type BlockProps = {
    children: any[],
    isInline?: any,
    node: BlockPropsNode,
    options: any
}