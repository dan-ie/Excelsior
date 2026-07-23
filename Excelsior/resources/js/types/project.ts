
type TemplateField = {
    id: number;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    settings: {};
};

export type Project = {
    id: number,
    name: string,
    description: string | ''
    is_public: boolean | false
}
