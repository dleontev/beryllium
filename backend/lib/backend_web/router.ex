defmodule BackendWeb.Router do
  use BackendWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", BackendWeb do
    pipe_through :api
    resources "/users", UserController, except: [:edit, :show]
    post "/users/validate/", UserController, :show
  end
end
