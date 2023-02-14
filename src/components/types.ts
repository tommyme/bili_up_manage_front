interface TreeNode {
    label: string;
    mid: number;
    avatar?: string;
    icon?: string;
    children?: TreeNode[];
}
interface videoInfo {
    comment: number;
    pic: string;
    title: string;
    created: number;
    length: string;
    bvid: string;
    play: number;
}
interface GroupInfo {
    name: string;
    tagid: number;
    count: number;
    tip: string;
    label: string;
}
export type { TreeNode, videoInfo, GroupInfo };
