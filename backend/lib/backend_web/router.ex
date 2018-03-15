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
    resources "/roles", RoleController, except: [:edit, :show]
    resources "/schools", SchoolController, except: [:edit, :show]
    resources "/sections", SectionController, except: [:edit, :show] 
    resources "/groupsets", GroupsetController
    resources "/discussions", DiscussionController 
    resources "/assignments", AssignmentController
    resources "/quizzes", QuizController
    resources "/questions", QuestionController
    resources "/answers", AnswerController
    resources "/assignments_to_groupsets", Assignment_to_groupsetController
    resources "/assignments_to_groups", AssignmentToGroupController
    resources "/assignments_to_users", AssignmentToUserController
    resources "/submissions", SubmissionController
    resources "/grades", GradeController
    

    resources "/posts", PostController, except: [:new, :edit] 
    resources "/users", UserController, except: [:new, :edit, :show] 

    delete "/groupsets", GroupsetController, :delete

    resources "/memberships", MembershipController 
    delete "/memberships/", MembershipController, :delete
    get "/memberships/sections/:section_id", MembershipController, :show_by_section

    get "/posts/discussions/:discussion_id", PostController, :show_all
    get "/posts/discussions/children/:post_id", PostController, :show_children
    get "/posts/discussions/self/:post_id", PostController, :show_self

    get "/users/sections/:section_id/", UserController, :show_by_course
    get "/users/groups/:group_id/", UserController, :show_by_group
    get "/users/:id", UserController, :show_by_id
    get "/account/", UserController, :show

    get "/enrollments/user/:section_id", EnrollmentController, :show

    get "/discussions/sections/:section_id/:is_discussion", DiscussionController, :show_all

    get "/courses/sections/:section_id", CourseController, :show
    get "/courses/user/all", CourseController, :show_all

    get "/courses/:section_id/home", PageController, :show

    get "/groups/user/all", GroupController, :show_all
    get "/groups/sections/:section_id", GroupController, :show_by_section
    get "/groups/users/:section_id", UserController, :show_members_by_section

    get "/groupsets/sections/:section_id", GroupsetController, :show_by_section

    delete "/sessions", SessionController, :delete
    post "/sessions/refresh", SessionController, :refresh

    #get "/submissions/assignments/:assignment_id", SubmissionController, :show_submissions_by_assignment
    get "/quizzes/assignments/:assignment_id", QuizController, :show_quiz_by_assignment

    get "/assignments/sections/:section_id", AssignmentController, :assignments_by_section
    get "/submissions/assignments/:assignment_id/count", SubmissionController, :count_submissions_by_assignment
    get "/submissions/assignments/:assignment_id/count/individual", SubmissionController, :count_submissions_by_assignment_individual
    get "/submissions/assignments/:assignment_id/all", SubmissionController, :show_submissions_by_assignment
    get "/submissions/assignments/:assignment_id/individual", SubmissionController, :show_submissions_by_assignment_individual
  end
  
end
