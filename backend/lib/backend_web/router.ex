defmodule BackendWeb.Router do
  use BackendWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
	  plug Guardian.Plug.VerifyHeader, realm: "Bearer"
	  plug Guardian.Plug.LoadResource
  end

  scope "/api", BackendWeb do
    pipe_through :api
	
    resources "/users", UserController, except: [:edit]
	  post "/sessions", SessionsController, :create # login
	  delete "/sessions", SessionsController, :delete # log out
  end
end
