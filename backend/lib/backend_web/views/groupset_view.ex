defmodule BackendWeb.GroupsetView do
  use BackendWeb, :view
  alias BackendWeb.GroupsetView

  def render("index.json", %{groupsets: groupsets}) do
    %{data: render_many(groupsets, GroupsetView, "groupset.json")}
  end

  def render("show_by_section.json", %{groupsets: groupsets}) do
    %{data: render_many(groupsets, GroupsetView, "groupset_by_section.json")}
  end

  def render("show.json", %{groupset: groupset}) do
    %{data: render_one(groupset, GroupsetView, "groupset.json")}
  end

  def render("groupset_by_section.json", %{groupset: groupset}) do
    %{
      id: groupset.id, 
      name: groupset.name
    }
  end

  def render("groupset.json", %{groupset: groupset}) do
    %{
      id: groupset.id, 
      name: groupset.name
    }
  end
end
