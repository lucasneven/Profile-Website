// First-visit intro: six dim-blue columns cover the page, then drop away right to left
// (0.6s in total) while the hero fades in behind them. It's plain CSS ("INTRO CURTAIN" in
// globals.css), so it plays smoothly before the page's JavaScript has even loaded.
//
// introScript runs in <head> before the first paint. On the first visit of a browser
// session it adds class="intro" to <html>, which shows the curtain and switches the hero
// to its intro: delays. Later visits in the same session, visitors with reduced motion,
// and browsers without JavaScript skip the intro entirely.
export const introScript = `(function(){try{if(sessionStorage.getItem("intro")||matchMedia("(prefers-reduced-motion: reduce)").matches)return;sessionStorage.setItem("intro","1");document.documentElement.classList.add("intro")}catch(e){}})()`;

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
