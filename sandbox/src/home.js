export default function Home() {
    return (
      <body>
        <title>SpotiCry Home</title>
        <button class="logout-button">Logout</button>
        <div class="center-items">
            <div class="circle">P</div>
            <div class="all">All</div>
            <div class="music">Music</div>
            <div class="podcast">Podcasts</div>
        </div>
        <div class="center-items">
            <div class="artists-grid">
                <div>
                    <div class="temp-img">Img</div>
                    <div class="artists">Artist 1</div>
                </div>
                <div>
                    <div class="temp-img">Img</div>
                    <div class="artists">Artist 2</div>
                </div>
                <div>
                    <div class="temp-img">Img</div>
                    <div class="artists">Artist 3</div>
                </div>
                <div>
                    <div class="temp-img">Img</div>
                    <div class="artists">Artist 4</div>
                </div>
            </div>
        </div>
        <div class="center-items">
            <h2>Your top mixes</h2>
            <div class="mixes-grid">
                <div class="mixes">Call</div>
                <div class="mixes">Emergency</div>
            </div>
        </div>
        <div class="center-items">
            <div class="navbar">
                <div class="center-items">
                    <div class="white-icon"><i class="fa fa-home fa-2x"></i></div>
                    <div class="navbar-text">Home</div>
                </div>
                <div class="center-items">
                    <div class="white-icon"><i class="fa fa-search fa-2x"></i></div>
                    <div class="navbar-text">Search</div>
                </div>
                <div class="center-items">
                    <div class="white-icon"><i class="fa fa-bookmark fa-2x"></i></div>
                    <div class="navbar-text">Your Library</div>
                </div>
            </div>
        </div>
    </body>
    )
  }