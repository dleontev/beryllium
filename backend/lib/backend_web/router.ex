defmodule BackendWeb.Router do
  use BackendWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
	  plug Guardian.Plug.VerifyHeader, realm: "Bearer"
	  plug Guardian.Plug.LoadResource
  end

  scope "/api", BackendWeb do
    pipe_through :api
<<<<<<< HEAD
    resources "/users", UserController, except: [:edit, :show]
    post "/users/validate/", UserController, :show
=======
	
    resources "/users", UserController, except: [:edit]
	  post "/sessions", SessionsController, :create # login
	  delete "/sessions", SessionsController, :delete # log out
>>>>>>> c9d39d6b0f65f4cd64794888f78e04e6e2410eb6
  end
end
