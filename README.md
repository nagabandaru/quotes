In the Specification, 

it's been asked for

* As a user I should always see an accurate price.

Modified for UX reasons, however, I have rounded to 2 decimals



* As a user I should always know which extras I've selected

In the wireframe document, there are no clues given, So I assumed the following

`Select this extra` should have the ability to `Remove this extra` so added a button with toggles
However I felt that visual clue is not enough, So I have added 

1. Background to the selected extra(For visual identification for the user)
2. Selected extra is visible as a chip so the user can easily view all or delete it from the top of the Quote Page. so they no need to scroll down to the addon( For user-friendliness)



Approach taken:

React proposed way `single responsibility principle and As it is a small app I have taken top-down approach

I have used some industry standard modules like 

1. `styles-components` styling the app
2. `classnames` for convenience
3. `immerjs`  to work with immutable state

No external store management libraries are used as it is a very simple app. However, I have used a reducer hook to have effective control of the state management.

The component tree used as per route, I am defining only notable components

/ : QuotesPage
/quote/{quoteId}: 
    QuotePage
        QuoteInfoCard
        QuotePriceCard
        AddOnCard[]

I split the components into 3 categories
Pages, Ex: QuotePage, QuotesPage
FutureComponents: Ex: QuoteInfoCard, QuotePriceCard, etc.
Basic Components, Ex: Button, Card, LodingMessage, etc.

A couple of Tests are also added for demo purposes.
