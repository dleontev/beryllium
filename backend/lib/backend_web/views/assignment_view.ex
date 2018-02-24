defmodule BackendWeb.AssignmentView do
  use BackendWeb, :view
  alias BackendWeb.AssignmentView

  def render("index.json", %{assignments: assignments}) do
    %{data: render_many(assignments, AssignmentView, "assignment.json")}
  end

  def render("show.json", %{assignment: assignment}) do
    %{data: render_one(assignment, AssignmentView, "assignment.json")}
  end

  def render("show_by_section.json", %{assignments: assignments}) do
    %{data: render_many(assignments, AssignmentView, "assignment_by_section.json")}
  end

  def render("assignment.json", %{assignment: assignment}) do
    %{
      id: assignment.id, 
      due_at: assignment.due_at,
      type: assignment.type,
      content: assignment.content,
      is_published: assignment.is_published,
      points_possible: assignment.points_possible,
      title: assignment.title
    }
  end

  def render("assignment_by_section.json", %{assignment: assignment}) do
    %{
      id: assignment.id, 
      due_at: assignment.due_at,
      type: assignment.type,
      content: assignment.content,
      is_published: assignment.is_published,
      points_possible: assignment.points_possible,
      title: assignment.title,
      group_id: assignment.group_id
    }
  end
end
