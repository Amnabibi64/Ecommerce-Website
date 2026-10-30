import { useEffect, useMemo, useState } from "react";
import {
  ShoppingBag, Search, Heart, UserRound, Menu, X, Plus, Minus,
  Trash2, LogOut, ArrowRight, Star, PackageCheck, ShieldCheck,
  Truck, RotateCcw, ChevronDown, ShoppingCart, Eye, EyeOff
} from "lucide-react";
import "./App.css";

const PRODUCTS = [
  {id:1,name:"Everyday Sneakers",category:"Fashion",price:4299,oldPrice:5499,rating:4.8,tag:"BESTSELLER",emoji:"👟",color:"#e7e5ff",description:"Lightweight comfort for your everyday adventures."},
  {id:2,name:"Studio Headphones",category:"Electronics",price:6899,oldPrice:7999,rating:4.7,tag:"POPULAR",emoji:"🎧",color:"#ffe9df",description:"Immersive sound with a comfortable fit."},
  {id:3,name:"Daily Carry Backpack",category:"Accessories",price:3499,oldPrice:0,rating:4.6,tag:"NEW",emoji:"🎒",color:"#e1f3e9",description:"A clean, practical backpack for work and study."},
  {id:4,name:"Smart Watch Active",category:"Electronics",price:8999,oldPrice:10999,rating:4.5,tag:"SALE",emoji:"⌚",color:"#e1ecff",description:"Keep your day organized at a glance."},
  {id:5,name:"Classic Cotton Tee",category:"Fashion",price:1499,oldPrice:1899,rating:4.4,tag:"",emoji:"👕",color:"#ffe8f2",description:"A soft cotton staple made for everyday wear."},
  {id:6,name:"Thermal Travel Bottle",category:"Accessories",price:1199,oldPrice:0,rating:4.7,tag:"ECO PICK",emoji:"🧴",color:"#fff0d9",description:"Keep your favourite drink close on the go."},
  {id:7,name:"Minimal Desk Lamp",category:"Home",price:2799,oldPrice:3299,rating:4.3,tag:"",emoji:"💡",color:"#f5e8ff",description:"A warm glow for focused evenings."},
  {id:8,name:"Ceramic Coffee Mug",category:"Home",price:899,oldPrice:0,rating:4.8,tag:"",emoji:"☕",color:"#f8e9df",description:"Your morning coffee deserves a lovely mug."},
  {id:9,name:"Urban Running Shoes",category:"Fashion",price:5199,oldPrice:6299,rating:4.6,tag:"TRENDING",emoji:"🏃",color:"#e6f3f5",description:"Supportive everyday shoes with sporty style."},
  {id:10,name:"Instant Camera",category:"Electronics",price:12499,oldPrice:13999,rating:4.5,tag:"GIFT PICK",emoji:"📷",color:"#fff0d9",description:"Save little moments in a big way."},
  {id:11,name:"Weekend Duffel Bag",category:"Accessories",price:3999,oldPrice:0,rating:4.4,tag:"",emoji:"🧳",color:"#e9e7ff",description:"A roomy companion for short getaways."},
  {id:12,name:"Cozy Accent Chair",category:"Home",price:18999,oldPrice:21999,rating:4.9,tag:"PREMIUM",emoji:"🪑",color:"#e5eee1",description:"Bring a little comfort to your favourite corner."}
];
const money = n => `Rs. ${Number(n).toLocaleString("en-PK")}`;
const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}
function validatePassword(password) {
  return password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);
}

function AuthScreen({ onLogin }) {
  const [mode,setMode] = useState("login");
  const [showPass,setShowPass] = useState(false);
  const [values,setValues] = useState({name:"",email:"",password:"",confirm:""});
  const [errors,setErrors] = useState({});
  const [notice,setNotice] = useState("");
  const update = e => setValues(v => ({...v,[e.target.name]:e.target.value}));
  function submit(e) {
    e.preventDefault();
    const next = {};
    if (mode === "register" && values.name.trim().length < 2) next.name = "Please enter your full name (at least 2 characters).";
    if (!validateEmail(values.email.trim())) next.email = "Enter a valid email address.";
    if (!validatePassword(values.password)) next.password = "Use 8+ characters with at least one letter and one number.";
    if (mode === "register" && values.password !== values.confirm) next.confirm = "Passwords do not match.";
    setErrors(next); setNotice("");
    if (Object.keys(next).length) return;
    const users = read("shopease-users", []);
    const email = values.email.trim().toLowerCase();
    if (mode === "register") {
      if (users.some(u => u.email === email)) { setErrors({email:"An account with this email already exists. Please log in."}); return; }
      const user = {name:values.name.trim(),email,password:values.password};
      localStorage.setItem("shopease-users",JSON.stringify([...users,user]));
      localStorage.setItem("shopease-session",JSON.stringify({name:user.name,email:user.email}));
      onLogin({name:user.name,email:user.email});
    } else {
      const user = users.find(u => u.email === email && u.password === values.password);
      if (!user) { setErrors({form:"Email or password is incorrect. Register first if you are a new customer."}); return; }
      localStorage.setItem("shopease-session",JSON.stringify({name:user.name,email:user.email}));
      onLogin({name:user.name,email:user.email});
    }
  }
  return <main className="auth-page">
    <section className="auth-visual">
      <div className="auth-brand"><span className="brand-mark">S</span> ShopEase</div>
      <div className="visual-copy">
        <span className="eyebrow light">A LITTLE JOY, DELIVERED</span>
        <h1>Good finds.<br/><em>Great feelings.</em></h1>
        <p>Discover thoughtful everyday essentials, handpicked to make your day a little better.</p>
        <div className="visual-stats"><div><strong>12+</strong><span>Curated picks</span></div><div><strong>4.7/5</strong><span>Happy shoppers</span></div></div>
      </div>
      <div className="floating-product float-one">🎧 <span>Sound that moves you</span></div>
      <div className="floating-product float-two">👟 <span>Everyday favourites</span></div>
      <div className="visual-orb orb-one"/><div className="visual-orb orb-two"/>
      <small className="visual-foot">YOUR NEXT FAVOURITE IS WAITING</small>
    </section>
    <section className="auth-panel">
      <div className="auth-mobile-brand"><span className="brand-mark">S</span> ShopEase</div>
      <div className="auth-card">
        <div className="auth-topline"><span className="eyebrow">{mode==="login"?"WELCOME BACK":"JOIN THE COMMUNITY"}</span><span className="auth-spark">✳</span></div>
        <h2>{mode==="login"?"Sign in to ShopEase":"Create your account"}</h2>
        <p className="muted">{mode==="login"?"Your good finds are just a sign-in away.":"Make an account to save favourites and track orders."}</p>
        <div className="auth-tabs"><button className={mode==="login"?"active":""} onClick={()=>{setMode("login");setErrors({});}}>Log in</button><button className={mode==="register"?"active":""} onClick={()=>{setMode("register");setErrors({});}}>Create account</button></div>
        <form onSubmit={submit} noValidate>
          {mode==="register" && <label>Full name<input name="name" value={values.name} onChange={update} placeholder="e.g. Ayesha Khan" autoComplete="name"/>{errors.name&&<small className="error">{errors.name}</small>}</label>}
          <label>Email address<input name="email" type="email" value={values.email} onChange={update} placeholder="you@example.com" autoComplete="email"/>{errors.email&&<small className="error">{errors.email}</small>}</label>
          <label>Password<div className="password-wrap"><input name="password" type={showPass?"text":"password"} value={values.password} onChange={update} placeholder="At least 8 characters" autoComplete={mode==="login"?"current-password":"new-password"}/><button type="button" className="show-pass" aria-label="Show or hide password" onClick={()=>setShowPass(s=>!s)}>{showPass?<EyeOff size={17}/>:<Eye size={17}/>}</button></div>{errors.password&&<small className="error">{errors.password}</small>}</label>
          {mode==="register"&&<label>Confirm password<input name="confirm" type={showPass?"text":"password"} value={values.confirm} onChange={update} placeholder="Type your password again" autoComplete="new-password"/>{errors.confirm&&<small className="error">{errors.confirm}</small>}</label>}
          {errors.form&&<div className="form-error">{errors.form}</div>}
          <button className="primary-btn auth-submit" type="submit">{mode==="login"?"Sign in":"Create account"} <ArrowRight size={18}/></button>
        </form>
        <p className="auth-switch">{mode==="login"?"New to ShopEase?":"Already have an account?"} <button onClick={()=>{setMode(mode==="login"?"register":"login");setErrors({});}}>{mode==="login"?"Create an account":"Log in"}</button></p>
        <div className="secure-note"><ShieldCheck size={16}/> Demo student project · Account data stays in this browser</div>
      </div>
      <span className="auth-copyright">© 2026 ShopEase · Student project</span>
    </section>
  </main>;
}

export default function App() {
  const [user,setUser] = useState(()=>read("shopease-session",null));
  const [cart,setCart] = useState(()=>read("shopease-cart",[]));
  const [wishlist,setWishlist] = useState(()=>read("shopease-wishlist",[]));
  const [orders,setOrders] = useState(()=>read("shopease-orders",[]));
  const [search,setSearch] = useState("");
  const [category,setCategory] = useState("All");
  const [sort,setSort] = useState("featured");
  const [view,setView] = useState("shop");
  const [drawer,setDrawer] = useState("");
  const [selected,setSelected] = useState(null);
  const [notice,setNotice] = useState("");
  const [mobileNav,setMobileNav] = useState(false);
  const [dark,setDark] = useState(()=>read("shopease-dark",false));
  const [expandedOrderId,setExpandedOrderId] = useState(null);
  const [customer,setCustomer] = useState({phone:"",address:""});
  const [checkoutErrors,setCheckoutErrors] = useState({});
  useEffect(()=>localStorage.setItem("shopease-cart",JSON.stringify(cart)),[cart]);
  useEffect(()=>localStorage.setItem("shopease-wishlist",JSON.stringify(wishlist)),[wishlist]);
  useEffect(()=>localStorage.setItem("shopease-orders",JSON.stringify(orders)),[orders]);
  useEffect(()=>localStorage.setItem("shopease-dark",JSON.stringify(dark)),[dark]);
  useEffect(()=>{if(notice){const t=setTimeout(()=>setNotice(""),2600);return()=>clearTimeout(t)}},[notice]);

  const products = useMemo(()=>{
    let list=PRODUCTS.filter(p=>(category==="All"||p.category===category)&&`${p.name} ${p.category}`.toLowerCase().includes(search.toLowerCase()));
    if(sort==="low")list.sort((a,b)=>a.price-b.price);
    if(sort==="high")list.sort((a,b)=>b.price-a.price);
    if(sort==="rating")list.sort((a,b)=>b.rating-a.rating);
    if(sort==="name")list.sort((a,b)=>a.name.localeCompare(b.name));
    return list;
  },[category,search,sort]);
  const subtotal=cart.reduce((sum,item)=>sum+item.price*item.qty,0);
  const shipping=subtotal===0||subtotal>=5000?0:250;
  const total=subtotal+shipping;
  const cartCount=cart.reduce((sum,item)=>sum+item.qty,0);
  const categories=["All","Fashion","Electronics","Accessories","Home"];
  function addToCart(product,qty=1){setCart(old=>{const found=old.find(i=>i.id===product.id);return found?old.map(i=>i.id===product.id?{...i,qty:i.qty+qty}:i):[...old,{...product,qty}]});setNotice(`${product.name} added to your bag`);}
  function changeQty(id,delta){setCart(old=>old.map(i=>i.id===id?{...i,qty:i.qty+delta}:i).filter(i=>i.qty>0));}
  function toggleWish(p){setWishlist(old=>old.some(i=>i.id===p.id)?old.filter(i=>i.id!==p.id):[...old,p]);setNotice(wishlist.some(i=>i.id===p.id)?"Removed from wishlist":"Saved to wishlist");}
  function logout(){localStorage.removeItem("shopease-session");setUser(null);setView("shop");setDrawer("");setNotice("You have logged out.");}
  function placeOrder(e){e.preventDefault();const er={};if(customer.phone.replace(/\D/g,"").length<10)er.phone="Enter a valid phone number (at least 10 digits).";if(customer.address.trim().length<8)er.address="Please enter a complete delivery address.";setCheckoutErrors(er);if(Object.keys(er).length)return;const order={id:"SE"+Date.now().toString().slice(-8),date:new Date().toLocaleString(),items:cart.map(i=>({...i})),subtotal,shipping,total,customer:{...customer},email:user.email};setOrders(old=>[order,...old]);setCart([]);setDrawer("");setView("orders");setNotice("Order placed successfully!");setCustomer({phone:"",address:""});}
  if(!user)return <AuthScreen onLogin={setUser}/>;

  return <div className={`app ${dark?"dark":""}`}>
    <div className="announcement"><span>✦</span> A little treat for you — free shipping over Rs. 5,000 <span className="announcement-end">Thoughtfully picked. Happily delivered.</span></div>
    <header className="site-header">
      <button className="mobile-menu icon-btn" onClick={()=>setMobileNav(v=>!v)} aria-label="Open menu">{mobileNav?<X/>:<Menu/>}</button>
      <button className="brand" onClick={()=>{setView("shop");window.scrollTo({top:0,behavior:"smooth"});}}><span className="brand-mark">S</span><span>ShopEase<span className="brand-dot">.</span></span></button>
      <nav className={mobileNav?"nav open":"nav"}><button className={view==="shop"?"nav-active":""} onClick={()=>{setView("shop");setMobileNav(false)}}>Shop</button><button onClick={()=>{setView("about");setMobileNav(false)}}>Our story</button><button onClick={()=>{setView("orders");setMobileNav(false)}}>My orders</button></nav>
      <div className="header-actions">
        <label className="header-search"><Search size={17}/><input value={search} onChange={e=>{setSearch(e.target.value);setView("shop")}} placeholder="Find something lovely..."/><kbd>⌕</kbd></label>
        <button className="icon-btn header-wish" onClick={()=>setDrawer("wishlist")} aria-label="Wishlist"><Heart/><span className="count">{wishlist.length}</span></button>
        <button className="icon-btn" onClick={()=>setDrawer("cart")} aria-label="Shopping bag"><ShoppingBag/><span className="count">{cartCount}</span></button>
        <button className="user-chip" onClick={()=>setDrawer("account")}><span className="avatar">{user.name?.[0]?.toUpperCase()||"U"}</span><span className="user-name">{user.name.split(" ")[0]}</span><ChevronDown size={14}/></button>
      </div>
    </header>

    {view==="shop"&&<><section className="hero">
      <div className="hero-content"><span className="eyebrow"><span className="eyebrow-line"/> THE EVERYDAY EDIT</span><h1>Find your next<br/><em>favourite thing.</em></h1><p>Little upgrades, thoughtful finds, and everyday essentials that just feel right.</p><div className="hero-buttons"><button className="primary-btn" onClick={()=>document.getElementById("collection")?.scrollIntoView({behavior:"smooth"})}>Explore collection <ArrowRight size={17}/></button><button className="text-btn" onClick={()=>setView("about")}>Get to know us <span>↗</span></button></div><div className="hero-proof"><div className="avatar-stack"><span>😊</span><span>🌼</span><span>✨</span></div><div><strong>Loved by everyday explorers</strong><small>Good things, good vibes.</small></div></div></div>
      <div className="hero-art"><div className="hero-circle"/><div className="hero-note note-top">your daily dose<br/>of delightful <span>✳</span></div><div className="hero-item item-shoe">👟</div><div className="hero-item item-headphones">🎧</div><div className="hero-item item-bag">🎒</div><div className="hero-note note-bottom"><span>✦</span> PICKED WITH CARE</div><div className="hero-orbit orbit-a"/><div className="hero-orbit orbit-b"/></div>
      <div className="hero-index">01 <span/> 03</div>
    </section>
    <section className="benefits"><div><span className="benefit-icon"><Truck/></span><div><strong>Free shipping</strong><small>On orders over Rs. 5,000</small></div></div><div><span className="benefit-icon"><ShieldCheck/></span><div><strong>Shop with confidence</strong><small>A simple, secure demo experience</small></div></div><div><span className="benefit-icon"><RotateCcw/></span><div><strong>Easy returns</strong><small>Hassle-free shopping promise</small></div></div><div><span className="benefit-icon"><PackageCheck/></span><div><strong>Picked with care</strong><small>Little details matter</small></div></div></section>
    <section className="collection section-wrap" id="collection"><div className="section-heading"><div><span className="eyebrow">THE GOOD STUFF</span><h2>Meet your new <em>favourites.</em></h2><p>Useful things. Lovely details. Just the right amount of extra.</p></div><span className="item-total">{products.length} items to explore ↘</span></div>
      <div className="shop-toolbar"><div className="category-pills">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={category===c?"selected":""}>{c}</button>)}</div><label className="sort-select">Sort by <select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="rating">Top rated</option><option value="name">Name A–Z</option></select></label></div>
      {products.length===0?<div className="empty-state"><span>🔎</span><h3>No matches just yet</h3><p>Try a different search or category.</p><button className="primary-btn" onClick={()=>{setSearch("");setCategory("All")}}>Show all products</button></div>:<div className="product-grid">{products.map(p=><article className="product-card" key={p.id}><div className="product-art" style={{background:p.color}}><span className="product-emoji">{p.emoji}</span>{p.tag&&<span className="product-tag">{p.tag}</span>}<button className={`wish-btn ${wishlist.some(i=>i.id===p.id)?"wished":""}`} onClick={()=>toggleWish(p)} aria-label="Toggle wishlist"><Heart size={18} fill={wishlist.some(i=>i.id===p.id)?"currentColor":"none"}/></button><button className="quick-view" onClick={()=>setSelected(p)}>Quick view <ArrowRight size={14}/></button></div><div className="product-info"><div className="product-category">{p.category}</div><button className="product-name" onClick={()=>setSelected(p)}>{p.name}</button><div className="rating"><Star size={14} fill="currentColor"/><strong>{p.rating}</strong><span> · Loved by shoppers</span></div><div className="product-bottom"><div><strong>{money(p.price)}</strong>{p.oldPrice>0&&<del>{money(p.oldPrice)}</del>}</div><button className="add-btn" onClick={()=>addToCart(p)} aria-label={`Add ${p.name} to cart`}><Plus size={18}/></button></div></div></article>)}</div>}
    </section></>}

    {view==="about"&&<section className="content-page"><span className="eyebrow">A LITTLE ABOUT US</span><h1>Shopping should feel <em>good.</em></h1><p className="content-lead">ShopEase is a student e-commerce project built around one simple idea: finding everyday things should be easy, clear, and a little delightful.</p><div className="about-cards"><div>✦<h3>Thoughtful finds</h3><p>A curated collection across fashion, electronics, accessories, and home.</p></div><div>♡<h3>Made for you</h3><p>Search, save favourites, and keep track of your cart in one place.</p></div><div>↗<h3>Learning by building</h3><p>This project demonstrates React components, state, validation, and browser storage.</p></div></div><button className="primary-btn" onClick={()=>setView("shop")}>Explore the shop <ArrowRight size={17}/></button></section>}

    {view==="orders"&&<section className="content-page orders-page"><span className="eyebrow">YOUR SHOPPING JOURNEY</span><h1>Orders & <em>little wins.</em></h1><p className="content-lead">All your demo orders, together in one place.</p>{orders.length===0?<div className="empty-state"><span>📦</span><h3>No orders yet</h3><p>Your next favourite find is waiting to be discovered.</p><button className="primary-btn" onClick={()=>setView("shop")}>Start exploring <ArrowRight size={17}/></button></div>:<div className="orders-list">{orders.map(o=><article className="order-card" key={o.id}><button className="order-summary" onClick={()=>setExpandedOrderId(expandedOrderId===o.id?null:o.id)}><span className="order-icon"><PackageCheck/></span><span className="order-main"><strong>Order #{o.id}</strong><small>{o.date} · {o.items.reduce((n,i)=>n+i.qty,0)} item(s)</small></span><span className="order-total">{money(o.total)}<small>{expandedOrderId===o.id?"Hide details":"View details"} <ChevronDown size={14}/></small></span></button>{expandedOrderId===o.id&&<div className="order-details">{o.items.map(i=><div className="order-product" key={i.id}><span className="order-product-emoji" style={{background:i.color}}>{i.emoji}</span><span><strong>{i.name}</strong><small>Qty: {i.qty} × {money(i.price)}</small></span><b>{money(i.price*i.qty)}</b></div>)}<div className="order-cost"><span>Subtotal</span><span>{money(o.subtotal)}</span><span>Shipping</span><span>{o.shipping===0?"Free":money(o.shipping)}</span><strong>Total paid (demo)</strong><strong>{money(o.total)}</strong><small>Delivery address: {o.customer?.address||"Not recorded"}</small></div></div>}</article>)}</div>}<p className="demo-disclaimer">Demo only: orders are saved in this browser and do not represent real purchases.</p></section>}

    <footer className="footer"><div className="footer-top"><div><button className="brand footer-brand" onClick={()=>setView("shop")}><span className="brand-mark">S</span><span>ShopEase<span className="brand-dot">.</span></span></button><p>Everyday finds, a little more delightful.</p></div><div><strong>Explore</strong><button onClick={()=>setView("shop")}>Shop all</button><button onClick={()=>setView("about")}>Our story</button><button onClick={()=>setView("orders")}>My orders</button></div><div><strong>Customer care</strong><span>Shipping & returns</span><span>FAQs</span><span>Contact (demo)</span></div><div className="footer-note"><span className="eyebrow">A SMALL NOTE</span><p>Designed with care for a React.js student project.</p><span>✳ Made for everyday joy.</span></div></div><div className="footer-bottom"><span>© 2026 ShopEase. Student project.</span><span>Built with React <span className="footer-heart">♥</span></span><button onClick={()=>setDark(d=>!d)}>{dark?"☀ Light mode":"☾ Dark mode"}</button></div></footer>

    {notice&&<div className="toast"><span>✓</span>{notice}</div>}
    {drawer&&<div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setDrawer("")}}><aside className="drawer"><div className="drawer-head"><div><span className="eyebrow">{drawer==="cart"?"YOUR BAG":drawer==="wishlist"?"SAVED FOR LATER":"YOUR ACCOUNT"}</span><h2>{drawer==="cart"?"Shopping bag":drawer==="wishlist"?"Wishlist":"Hello, "+user.name.split(" ")[0]}</h2></div><button className="icon-btn" onClick={()=>setDrawer("")}><X/></button></div>
      {drawer==="account"?<div className="account-content"><div className="account-avatar">{user.name[0].toUpperCase()}</div><h3>{user.name}</h3><p>{user.email}</p><div className="account-stat"><span>Saved favourites</span><strong>{wishlist.length}</strong></div><div className="account-stat"><span>Orders placed</span><strong>{orders.length}</strong></div><button className="secondary-btn full-btn" onClick={()=>{setDrawer("");setView("orders")}}>View my orders <ArrowRight size={16}/></button><button className="logout-btn" onClick={logout}><LogOut size={17}/> Log out</button><small className="demo-disclaimer">Demo account stored in this browser. Do not use a real password.</small></div>:null}
      {drawer==="cart"&&<>{cart.length===0?<div className="drawer-empty"><span>🛍️</span><h3>Your bag is taking a breather</h3><p>Find something lovely to add.</p><button className="primary-btn" onClick={()=>{setDrawer("");setView("shop")}}>Explore the shop</button></div>:<><div className="drawer-items">{cart.map(i=><div className="drawer-product" key={i.id}><span className="drawer-product-art" style={{background:i.color}}>{i.emoji}</span><div className="drawer-product-info"><strong>{i.name}</strong><small>{money(i.price)}</small><div className="qty-control"><button onClick={()=>changeQty(i.id,-1)}><Minus size={13}/></button><span>{i.qty}</span><button onClick={()=>changeQty(i.id,1)}><Plus size={13}/></button></div></div><button className="remove-btn" onClick={()=>setCart(old=>old.filter(x=>x.id!==i.id))} aria-label="Remove item"><Trash2 size={16}/></button></div>)}</div><div className="drawer-summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div><span>Shipping</span><strong>{shipping===0?"Free":money(shipping)}</strong></div>{subtotal>0&&subtotal<5000&&<small>Add {money(5000-subtotal)} more for free shipping.</small>}<div className="grand-total"><span>Total</span><strong>{money(total)}</strong></div><button className="primary-btn full-btn" onClick={()=>setDrawer("checkout")}>Continue to checkout <ArrowRight size={17}/></button><p className="secure-note"><ShieldCheck size={15}/> Demo checkout — no payment is collected</p></div></>}</>}
      {drawer==="wishlist"&&(wishlist.length===0?<div className="drawer-empty"><span>♡</span><h3>Save the things you love</h3><p>Tap a heart on any product to keep it here.</p><button className="primary-btn" onClick={()=>{setDrawer("");setView("shop")}}>Discover products</button></div>:<div className="drawer-items">{wishlist.map(i=><div className="drawer-product" key={i.id}><span className="drawer-product-art" style={{background:i.color}}>{i.emoji}</span><div className="drawer-product-info"><strong>{i.name}</strong><small>{money(i.price)}</small><button className="mini-link" onClick={()=>{addToCart(i);setDrawer("cart")}}>Add to bag <ArrowRight size={13}/></button></div><button className="remove-btn" onClick={()=>setWishlist(old=>old.filter(x=>x.id!==i.id))}><X size={16}/></button></div>)}</div>)}
      {drawer==="checkout"&&<form className="checkout-form" onSubmit={placeOrder} noValidate><div className="checkout-items">{cart.map(i=><div key={i.id}><span>{i.emoji} {i.name} × {i.qty}</span><strong>{money(i.price*i.qty)}</strong></div>)}</div><div className="grand-total"><span>Total</span><strong>{money(total)}</strong></div><h3>Delivery details</h3><label>Phone number<input value={customer.phone} onChange={e=>setCustomer(c=>({...c,phone:e.target.value}))} placeholder="03XX XXXXXXX" inputMode="tel"/>{checkoutErrors.phone&&<small className="error">{checkoutErrors.phone}</small>}</label><label>Delivery address<textarea value={customer.address} onChange={e=>setCustomer(c=>({...c,address:e.target.value}))} placeholder="House, street, area, city" rows="3"/>{checkoutErrors.address&&<small className="error">{checkoutErrors.address}</small>}</label><button type="submit" className="primary-btn full-btn">Place demo order <ArrowRight size={17}/></button><p className="secure-note"><ShieldCheck size={15}/> No real payment or delivery is made.</p></form>}
    </aside></div>}
    {selected&&<div className="overlay product-modal-overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setSelected(null)}}><div className="product-modal"><button className="icon-btn modal-close" onClick={()=>setSelected(null)}><X/></button><div className="modal-art" style={{background:selected.color}}>{selected.emoji}</div><div className="modal-copy"><span className="eyebrow">{selected.category.toUpperCase()}</span><h2>{selected.name}</h2><div className="rating"><Star size={15} fill="currentColor"/><strong>{selected.rating}</strong><span> · Customer favourite</span></div><p>{selected.description}</p><div className="modal-price">{money(selected.price)} {selected.oldPrice>0&&<del>{money(selected.oldPrice)}</del>}</div><button className="primary-btn full-btn" onClick={()=>{addToCart(selected);setSelected(null)}}><ShoppingBag size={17}/> Add to bag</button><button className="secondary-btn full-btn" onClick={()=>toggleWish(selected)}><Heart size={17}/> {wishlist.some(i=>i.id===selected.id)?"Remove from wishlist":"Save to wishlist"}</button></div></div></div>}
  </div>;
}