type FieldSettings = {
    color?: string;
    fontSize?: number;
    fontWeight?: string;
    textAlign?: string;
};

export type TemplateField = {
    id: number;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    settings: FieldSettings;
};

export type Project = {
    id: number,
    name: string,
    description: string | ''
    is_public: boolean | false
}
