var container = document.getElementById ('container');
let page = 1;
let t = 1;
async function data () {
  //   console.log (t);
  //   const d = await fetch (
  //     `https://api.unsplash.com/photos/random/?client_id=Abm0VwKHKq91GHkNb3r_THEJz74ASAxWGzX9-CNdH8c&count=20`
  //   );
  //   const posts = await d.json ();
  //   posts.map (e => {
  //     const htmlData = `
  //         <h1>${t++}</h1>
  //         <div class="imgDiv">
  //             <img src=${e.urls.regular}  class="imgDiv_img" />
  //         </div>`;
  //     container.insertAdjacentHTML ('beforeend', htmlData);
  //   });
  //   return;
  //   page++;
  //   setTimeout (() => {
  //     container.insertAdjacentHTML ('beforeend', `<h1 id="load">Loading...</h1>`);
  //   }, 2);
  //   let loader = document.getElementById ('load');
  //   loader.remove ();
  console.log (t);
  if (t >= 125) {
    return;
  }

  async function loader () {
    for (let i = 0; i < 25; i++) {
      const htmlData = `
    <h1>Masai School ${t++}</h1>
    `;
      container.insertAdjacentHTML ('beforeend', htmlData);
    }
  }
  await loader ();
}

data ();
if (t === 125) {
  container.off ('scroll');
}

container.addEventListener ('scroll', () => {
  //   const {scrollHeight, clientHeight, scrollTop} = container.documentElement;
  if (
    Number (container.scrollTop) + Number (container.clientHeight) >=
    Number (container.scrollHeight) - 5
  ) {
    data ();
  }
});
