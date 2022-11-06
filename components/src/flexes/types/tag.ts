export type EmbedsTagType = 'Img' | 'Iframe' | 'Embed' | 'Object' | 'Param' | 'Video' | 'Audio' | 'Source' | 'Canvas' | 'Map' | 'Area';
export type FormsTagType =
  | 'Form'
  | 'Input'
  | 'Fieldset'
  | 'Legend'
  | 'Label'
  | 'Button'
  | 'Select'
  | 'Datalist'
  | 'Optgroup'
  | 'Option'
  | 'Textarea'
  | 'Keygen'
  | 'Output'
  | 'Progress'
  | 'Meter';

export type GroupsTagType = 'Div' | 'Pre' | 'Blockquote' | 'Ol' | 'Ul' | 'Li' | 'Dl' | 'Dt' | 'Dd' | 'Figure' | 'Figcaption' | 'Hr';
export type HeadsTagType = 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6';
export type InteractiveTagType = 'Details' | 'Summary' | 'Menu';
export type SectionsTagType = 'Section' | 'Nav' | 'Article' | 'Header' | 'Footer' | 'Main' | 'Address';
export type TablesTagType = 'Table' | 'Caption' | 'Colgroup' | 'Col' | 'Tbody' | 'Thead' | 'Tfoot' | 'Tr' | 'Td' | 'Th';
export type TextsTagType =
  | 'P'
  | 'A'
  | 'Em'
  | 'Strong'
  | 'Small'
  | 'S'
  | 'Cite'
  | 'Q'
  | 'Dfn'
  | 'Abbr'
  | 'Time'
  | 'Code'
  | 'Var'
  | 'Samp'
  | 'Kbd'
  | 'Sub'
  | 'Sup'
  | 'I'
  | 'B'
  | 'Mark'
  | 'Ruby'
  | 'Rt'
  | 'Rp'
  | 'Bdo'
  | 'Span'
  | 'Br'
  | 'Wbr'
  | 'Ins'
  | 'Del';

export type TagType =
  | EmbedsTagType
  | FormsTagType
  | GroupsTagType
  | HeadsTagType
  | InteractiveTagType
  | SectionsTagType
  | TablesTagType
  | TextsTagType;
