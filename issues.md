# Known Issues - Personal Website

## Card Click Issue - DEBUGGING IN PROGRESS

**Original Problem:**
- Clicking on category cards didn't show subcards
- Network tab showed images loading (proving JS was running)
- Subcards never appeared visually

**Analysis:**
The JavaScript event listeners WERE present (contrary to initial theory). The issue appeared to be a timing/rendering problem where:
1. DOM elements were being created (evidenced by image requests)
2. Classes were being added
3. But the browser wasn't rendering the display: grid change properly

**Fixes Applied (2026-01-24):**
1. ✅ Split `classList.add()` into separate calls for better compatibility
2. ✅ Added forced reflow (`void container.offsetHeight;`) before showing content
3. ✅ Added error checking and console logging for debugging
4. ✅ Improved `closeSubcards()` to explicitly remove all category classes
5. ✅ Added defensive null checks

**Testing Instructions:**
1. Open index.html in browser
2. Open browser DevTools Console (F12)
3. Click on any category card
4. Check console for messages:
   - Should see: "Subcards rendered for category: [name]"
   - Should NOT see any errors
5. Check Elements tab to verify:
   - #subcard-container has classes: "active category-[name]"
   - Element style shows: display: grid
6. Visually verify subcards appear below cards

**If Still Broken:**
Run this in browser console after clicking a card:
```javascript
const container = document.getElementById('subcard-container');
console.log('Classes:', container.className);
console.log('Display:', getComputedStyle(container).display);
console.log('Children:', container.children.length);
```

## Status: FIXES APPLIED - NEEDS TESTING
Priority: High