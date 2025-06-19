const SideBar = () => {
  return (
  <div className="d-flex">
    <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse">
        <div className="position-sticky">
        <div className="list-group list-group-flush mt-4">
            <a href="/dashboard" className="list-group-item list-group-item-action text-black">Dashboard</a>
            <a href="/products" className="list-group-item list-group-item-action text-black">Products</a>
            <a href="/orders" className="list-group-item list-group-item-action text-black">Orders</a>
        </div>
        </div>
    </nav>

    <main style={{marginTop: "58px"}}>
        <div className="container pt-4">
        </div>
    </main>
  </div>
  );
}

export default SideBar;

