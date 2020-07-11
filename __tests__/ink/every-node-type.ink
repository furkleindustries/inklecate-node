/* InkInclude */
INCLUDE for-inclusion.ink

/* InkLogic */
VAR logic = "logic"
~ logic = "bar"

/* InkAuthorWarning */
TODO: Author warning!

/* InkDivert */
-> knot


/* InkKnot */
=== knot ===
/* InkChoice */
* sequences
  /* InkContent */
  This is content.
  -> sequences


/* InkExpression */
{logic == "logic": expression}

/* InkWhitespace */

=== sequences ===
/* InkSequence */
{3|2|1}

* sequences->sequences
* knot->knot
