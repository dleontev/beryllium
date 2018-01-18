defmodule BackendWeb.Router do
  use BackendWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
	  plug Guardian.Plug.VerifyHeader, realm: "Bearer"
	  plug Guardian.Plug.LoadResource
  end

  scope "/api", BackendWeb do
    pipe_through :api
    resources "/users", UserController, except: [:edit, :show]
    resources "/courses", CourseController, except: [:edit, :show]
    resources "/enrollments", EnrollmentController, except: [:edit, :show]
    resources "/groups", GroupController, except: [:edit, :show]
    resources "/groupsets", GroupsetController, except: [:edit, :show]
    resources "/roles", RoleController, except: [:edit, :show]
    resources "/schools", SchoolController, except: [:edit, :show]
    resources "/sections", SectionController, except: [:edit, :show]
    post "/users/validate/", UserController, :show
	  post "/sessions", SessionsController, :create # login
	  delete "/sessions", SessionsController, :delete # log out
  end
end
