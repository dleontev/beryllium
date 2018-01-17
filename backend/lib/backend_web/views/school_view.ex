defmodule BackendWeb.SchoolView do
  use BackendWeb, :view
  alias BackendWeb.SchoolView

  def render("index.json", %{schools: schools}) do
    %{data: render_many(schools, SchoolView, "school.json")}
  end

  def render("show.json", %{school: school}) do
    %{data: render_one(school, SchoolView, "school.json")}
  end

  def render("school.json", %{school: school}) do
    %{id: school.id}
  end
end
