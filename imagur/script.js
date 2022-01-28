let title = document.getElementById ('title');
let img = document.getElementById ('imgTag');
let likes = document.getElementById ('likes');
let posts = document.getElementById ('posts');
let dbc = document.getElementById ('dbc');
let timerId;
// let inp = document.getElementById ('inputVal').value;
async function findd () {
  let query = document.getElementById ('inputVal').value;

  if (query.length < 3) {
    return false;
  }

  let data = await search (query);

  append (data.results);
}

async function search (query) {
  const d = await fetch (
    `https://api.unsplash.com/search/photos/?client_id=Abm0VwKHKq91GHkNb3r_THEJz74ASAxWGzX9-CNdH8c&query=${query}`
  );
  const posts = await d.json ();

  return posts;
}

function append (k) {
  if (k == undefined) {
    return false;
  }
  console.log ('k', k);
  dbc.innerHTML = null;

  k.forEach (e => {
    let p = document.createElement ('p');
    // console.log ('e.title', e.alt_description);

    p.innerText = e.alt_description;
    dbc.append (p);

    console.log (dbc);
    // p.onclick = function () {
    //   showMovieData (movie);
    //   return;
    // };
  });
}

function debounce (func, delay) {
  //lets talk about A
  //func = main()

  dbc.style.visibility = `visible`;

  //ave-setTimeout - func - main()-searchMovies("ave")
  //aven-clear the prev timeour - setTimout - func()-main()-searchMovies("aven;")

  if (timerId) {
    clearTimeout (timerId);
  }

  timerId = setTimeout (() => {
    func ();
  }, delay);
}

if (JSON.parse (localStorage.getItem ('page')) === null) {
  localStorage.setItem ('page', JSON.stringify ('1'));
}
let page = JSON.parse (localStorage.getItem ('page')) || 1;
function pag (num) {
  console.log (num, 'hello');
  if (num === 1) {
    page = +page + 1;
  } else {
    page = +page - 1;
  }
  data ();
}

async function data () {
  const d = await fetch (
    `https://api.unsplash.com/photos/?client_id=Abm0VwKHKq91GHkNb3r_THEJz74ASAxWGzX9-CNdH8c&page=${page}&per_page=20`
  );
  const posts = await d.json ();

  showData (posts);
}

function showData (data) {
  posts.innerHTML = null;
  data.forEach (element => {
    let card = document.createElement ('div');
    card.className = 'card';

    let card_imgDiv = document.createElement ('div');
    card_imgDiv.className = 'card_imgDiv';

    let img = document.createElement ('img');

    img.src = element.urls.small;

    card_imgDiv.appendChild (img);

    let b_container = document.createElement ('div');
    b_container.className = 'b_container';

    let title = document.createElement ('h4');

    title.className = 'title';
    let str = element.description || element.alt_description || 'More Details';
    // str.split("");
    let n = str.split ('').join ('');
    let newstr = '';
    for (let i = 0; i < 11; i++) {
      newstr += n[i];
    }
    // str.slic(0,10)
    title.innerHTML = newstr + '...';

    let stats = document.createElement ('div');
    stats.className = 'stats';

    let stats_span1 = document.createElement ('div');
    stats_span1.className = 'stats_span';

    let i1 = document.createElement ('i');
    i1.className = 'fas fa-arrow-up';

    let i2 = document.createElement ('i');
    i2.className = 'likes';

    if (element.likes === undefined) {
      i2.innerHTML = 23;
    } else {
      i2.innerHTML = element.likes || 23;
    }

    let i3 = document.createElement ('i');
    i3.className = 'fas fa-arrow-down margin';

    stats_span1.append (i1, i2, i3);

    let stats_span2 = document.createElement ('div');
    stats_span2.className = 'stats_span';
    let i4 = document.createElement ('i');
    i4.className = 'fas fa-comment-alt';

    let i5 = document.createElement ('i');
    i5.innerHTML = '23';

    stats_span2.append (i4, i5);

    let stats_span3 = document.createElement ('div');
    stats_span3.className = 'stats_span';

    let i6 = document.createElement ('i');
    i6.className = 'fas fa-eye';
    let i7 = document.createElement ('i');
    i7.innerHTML = '11';

    stats_span3.append (i6, i7);

    stats.append (stats_span1, stats_span2, stats_span3);

    b_container.append (title, stats);

    card.append (card_imgDiv, b_container);
    posts.append (card);
  });
}

data ();
