defmodule BackendWeb.Router do
  use BackendWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
	  plug Guardian.Plug.VerifyHeader, realm: "Bearer"
	  plug Guardian.Plug.LoadResource
  end

  scope "/api", BackendWeb do
    pipe_through :api

    resources "/router", UserController, except: [:edit]
    resources "/courses", CourseController, except: [:edit]
    resources "/enrollments", EnrollmentController, except: [:edit, :show]
    resources "/groups", GroupController, except: [:edit]
    resources "/groupsets", GroupsetController, except: [:edit, :show]
    resources "/roles", RoleController, except: [:edit, :show]
    resources "/schools", SchoolController, except: [:edit, :show]
    resources "/sections", SectionController, except: [:edit, :show]
    resources "/announcements", AnnouncementController

    get "/announcements/sections/:section_id", AnnouncementController, :show_all

    get "/courses/sections/:section_id", CourseController, :show
    get "/courses/user/all", CourseController, :show_all

    get "/groups/user/all", GroupController, :show_all

    get "/users/sections/:section_id/", UserController, :show_by_course
    get "/users/groups/:group_id/", UserController, :show_by_group
    get "/account/", UserController, :show

	  post "/sessions", SessionsController, :create # login
	  delete "/sessions", SessionsController, :delete # log out
  end
end
