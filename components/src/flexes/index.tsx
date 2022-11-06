import generate from './generate';

export * from './types';
export * from './constants';
export * from './entity/FlexLayout';
export * from './entity/BoxLayout';
export * from './entity/Content';
export * from './entity/OnHandle';
export * from './entity/Animation';
export * from './nodes/context';
export * from './plugin/hoverAlt';
export * from './styledComponents';

// Sections
export const Section = generate('Section');
export const Nav = generate('Nav');
export const Article = generate('Article');
export const Header = generate('Header');
export const Footer = generate('Footer');
export const Main = generate('Main');
export const Address = generate('Address');
// Heads
export const H1 = generate('H1');
export const H2 = generate('H2');
export const H3 = generate('H3');
export const H4 = generate('H4');
export const H5 = generate('H5');
export const H6 = generate('H6');
// Groups
export const Div = generate('Div');
export const Pre = generate('Pre');
export const Blockquote = generate('Blockquote');
export const Ol = generate('Ol');
export const U = generate('Ul');
export const Li = generate('Li');
export const Dl = generate('Dl');
export const Dt = generate('Dt');
export const Dd = generate('Dd');
export const Figure = generate('Figure');
export const Figcaption = generate('Figcaption');
export const Hr = generate('Hr');
// Texts
export const P = generate('P');
export const A = generate('A');
export const Em = generate('Em');
export const Strong = generate('Strong');
export const Small = generate('Small');
export const S = generate('S');
export const Cite = generate('Cite');
export const Q = generate('Q');
export const Dfn = generate('Dfn');
export const Abbr = generate('Abbr');
export const Time = generate('Time');
export const Code = generate('Code');
export const Var = generate('Var');
export const Samp = generate('Samp');
export const Kbd = generate('Kbd');
export const Sub = generate('Sub');
export const Sup = generate('Sup');
export const I = generate('I');
export const B = generate('B');
export const Mark = generate('Mark');
export const Ruby = generate('Ruby');
export const Rt = generate('Rt');
export const Rp = generate('Rp');
export const Bdo = generate('Bdo');
export const Span = generate('Span');
export const Br = generate('Br');
export const Wbr = generate('Wbr');
export const Ins = generate('Ins');
export const Del = generate('Del');
// Embeds
export const Img = generate('Img');
export const Iframe = generate('Iframe');
export const Embed = generate('Embed');
export const Object = generate('Object');
export const Param = generate('Param');
export const Video = generate('Video');
export const Audio = generate('Audio');
export const Source = generate('Source');
export const Canvas = generate('Canvas');
export const Map = generate('Map');
export const Area = generate('Area');
// Table
export const Table = generate('Table');
export const Caption = generate('Caption');
export const Colgroup = generate('Colgroup');
export const Col = generate('Col');
export const Tbody = generate('Tbody');
export const Thead = generate('Thead');
export const Tfoot = generate('Tfoot');
export const Tr = generate('Tr');
export const Td = generate('Td');
export const Th = generate('Th');
// Forms
export const Form = generate('Form');
export const Input = generate('Input');
export const Fieldset = generate('Fieldset');
export const Legend = generate('Legend');
export const Label = generate('Label');
export const Button = generate('Button');
export const Select = generate('Select');
export const Datalist = generate('Datalist');
export const Optgroup = generate('Optgroup');
export const Option = generate('Option');
export const Textarea = generate('Textarea');
export const Keygen = generate('Keygen');
export const Output = generate('Output');
export const Progress = generate('Progress');
export const Meter = generate('Meter');
// Interactive
export const Details = generate('Details');
export const Summary = generate('Summary');
export const Menu = generate('Menu');

// default
export default generate('Div');
