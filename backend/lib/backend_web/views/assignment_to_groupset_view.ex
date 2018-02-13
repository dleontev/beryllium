defmodule BackendWeb.Assignment_to_groupsetView do
  use BackendWeb, :view
  alias BackendWeb.Assignment_to_groupsetView

  def render("index.json", %{assignments_to_groupsets: assignments_to_groupsets}) do
    %{data: render_many(assignments_to_groupsets, Assignment_to_groupsetView, "assignment_to_groupset.json")}
  end

  def render("show.json", %{assignment_to_groupset: assignment_to_groupset}) do
    %{data: render_one(assignment_to_groupset, Assignment_to_groupsetView, "assignment_to_groupset.json")}
  end

  def render("assignment_to_groupset.json", %{assignment_to_groupset: assignment_to_groupset}) do
    %{id: assignment_to_groupset.id}
  end
end
