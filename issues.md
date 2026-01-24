# Known Issues - Personal Website

## Critical Bug: Card Click Not Working

**Problem:**
- Clicking on any of the 4 main category cards (Essays, Work, Side Projects, Education) produces no visual response
- Network tab shows subcard images are being requested/loaded
- Subcards never appear on screen

**Expected Behavior:**
- Click card → subcards expand below
- Background cards grey out (opacity 0.65)
- Each category shows unique visual tie (left border, top stripe, corner accents, or gradient)
- Click outside or ESC to close

**Technical Details:**
- JavaScript event listeners appear configured correctly in DOMContentLoaded
- `renderSubcards()` function should add 'active' and 'category-X' classes to #subcard-container
- CSS has `display: none` by default, should switch to `display: grid` when `.active` class added
- Images loading suggests JS is executing but DOM manipulation failing

**Attempted Fixes:**
- Fixed class manipulation from `className =` to `classList.add()`
- Updated closeSubcards() to properly clean up classes
- Still not working

**Next Steps to Debug:**
1. Check browser console for JS errors
2. Verify event listeners are actually attaching to cards
3. Add console.log() statements in renderSubcards() to track execution
4. Confirm CSS `.active` class rules are correct
5. Test if subcard-container is receiving classes via DevTools

## Status: UNRESOLVED
Priority: High - Core functionality broken
