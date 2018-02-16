defmodule BackendWeb.AssignmentToUserView do
  use BackendWeb, :view
  alias BackendWeb.AssignmentToUserView

  def render("index.json", %{assignments_to_users: assignments_to_users}) do
    %{data: render_many(assignments_to_users, AssignmentToUserView, "assignment_to_user.json")}
  end

  def render("show.json", %{assignment_to_user: assignment_to_user}) do
    %{data: render_one(assignment_to_user, AssignmentToUserView, "assignment_to_user.json")}
  end

  def render("assignment_to_user.json", %{assignment_to_user: assignment_to_user}) do
    %{id: assignment_to_user.id}
  end
end
