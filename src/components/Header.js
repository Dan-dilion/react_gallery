import React from "react";
import { Link } from "react-router-dom";

export class Header extends React.Component {
	render() {
		return(
			<div>
				<div className="app-header">
					<h1>React Gallery</h1>
					<nav className="navbar">
						<div>
							<ul>
								<li className="navbar-items"><Link to={"/home"}>Home</Link></li>
								<li className="navbar-items"><Link to={"/gallery"}>Gallery</Link></li>
							</ul>
						</div>
					</nav>
				</div>
			</div>
		);
	}
}
