defmodule BackendWeb.AssignmentToGroupView do
  use BackendWeb, :view
  alias BackendWeb.AssignmentToGroupView

  def render("index.json", %{assignments_to_groups: assignments_to_groups}) do
    %{data: render_many(assignments_to_groups, AssignmentToGroupView, "assignment_to_group.json")}
  end

  def render("show.json", %{assignment_to_group: assignment_to_group}) do
    %{data: render_one(assignment_to_group, AssignmentToGroupView, "assignment_to_group.json")}
  end

  def render("assignment_to_group.json", %{assignment_to_group: assignment_to_group}) do
    %{id: assignment_to_group.id}
  end
end
