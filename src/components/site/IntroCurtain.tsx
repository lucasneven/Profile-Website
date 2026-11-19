// Page-load intro: six deep-blue columns cover the page, then drop away right to left
// (all gone by 0.9s) and the hero fades in right behind them. It's plain CSS ("INTRO
// CURTAIN" in globals.css), so it plays smoothly before the page's JavaScript has loaded.
//
// introScript runs in <head> before the first paint and adds class="intro" to <html>,
// which shows the curtain and switches the hero to its intro: delays. It plays on every
// full page load (reloads too). Visitors with reduced motion and browsers without
// JavaScript skip the intro entirely.
export const introScript = `(function(){try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("intro")}catch(e){}})()`;

const columns = [1, 2, 3, 4, 5, 6];

export function IntroCurtain() {
  return (
    <div aria-hidden="true" className="intro-curtain">
      {columns.map((n) => (
        <span key={n} />
      ))}
    </div>
  );
}
