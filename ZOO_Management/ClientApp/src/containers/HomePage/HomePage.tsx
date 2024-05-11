import "./HomePage.css";

export const HomePage = () => {
    return (
        <div>
            <div className="title">
                <h1>Dobrodošli u sustav za održavanje ZOO vrtova</h1>
            </div>
            <div className="homepage-container">
                <div>
                    <img
                        src={"/lav.jpg"}
                        aria-label="img"
                        alt="img-value"
                        className="img-value"
                    />
                </div>
                <div>
                    <img
                        src={"/zirafe.jpg"}
                        aria-label="img"
                        alt="img-value"
                        className="img-value"
                    />
                </div>
                <div>
                    <img
                        src={"/marmun.jpg"}
                        aria-label="img"
                        alt="img-value"
                        className="img-value"
                    />
                </div>
                <div>
                    <img
                        src={"/lol.jpg"}
                        aria-label="img"
                        alt="img-value"
                        className="img-value"
                    />
                </div>
            </div>
        </div>
    );
};
