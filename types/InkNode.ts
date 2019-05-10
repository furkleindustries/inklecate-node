import {
  InkAuthorWarning,
} from './InkAuthorWarning';
import {
  InkChoice,
} from './InkChoice';
import {
  InkConditional,
} from './InkConditional';
import {
  InkContent,
} from './InkContent';
import {
  InkDivert,
} from './InkDivert';
import {
  InkExpression,
} from './InkExpression';
import {
  InkInclude,
} from './InkInclude';
import {
  InkKnot,
} from './InkKnot';
import {
  InkLogic,
} from './InkLogic';
import {
  InkSequence,
} from './InkSequence';
import {
  InkTag,
} from './InkTag';
import {
  InkWhitespace,
} from './InkWhitespace';

export type InkNode =
  InkAuthorWarning |
  InkChoice |
  InkConditional |
  InkContent |
  InkDivert |
  InkExpression |
  InkInclude |
  InkKnot |
  InkLogic |
  InkSequence |
  InkTag |
  InkWhitespace;
