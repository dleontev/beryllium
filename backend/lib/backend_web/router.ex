defmodule BackendWeb.Router do
  use BackendWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
	  plug Guardian.Plug.VerifyHeader, realm: "Bearer"
	  plug Guardian.Plug.LoadResource
  end

  pipeline :ensure_authed_access do
    plug(Guardian.Plug.EnsureAuthenticated, %{handler: BackendWeb.SessionController})
  end

  scope "/api", BackendWeb do
    pipe_through :api

    post "/users", UserController, :create
	  post "/sessions", SessionController, :create
  end

  scope "/api", BackendWeb do
    pipe_through([:api, :ensure_authed_access])

    resources "/enrollments", EnrollmentController, except: [:edit, :show]
    resources "/groups", GroupController, except: [:edit]
    resources "/groupsets", GroupsetController, except: [:edit, :show]
    resources "/roles", RoleController, except: [:edit, :show]
    resources "/schools", SchoolController, except: [:edit, :show]
    resources "/sections", SectionController, except: [:edit, :show] 
    resources "/discussions", DiscussionController 
    resources "/posts", PostController, except: [:new, :edit] 
    resources "/users", UserController, except: [:new, :edit] 

    get "/posts/discussions/:discussion_id", PostController, :show_all

    get "/users/sections/:section_id/", UserController, :show_by_course
    get "/users/groups/:group_id/", UserController, :show_by_group
    get "/users/:id", UserController, :show_by_id
    get "/account/", UserController, :show

    get "/discussions/sections/:section_id/:is_discussion", DiscussionController, :show_all

    get "/courses/sections/:section_id", CourseController, :show
    get "/courses/user/all", CourseController, :show_all

    get "/groups/user/all", GroupController, :show_all
    get "/groups/sections/:section_id", GroupController, :show_by_section
    get "/groups/users/:section_id", UserController, :show_members_by_section

    delete "/sessions", SessionController, :delete
    post "/sessions/refresh", SessionController, :refresh    
  end
  
end
