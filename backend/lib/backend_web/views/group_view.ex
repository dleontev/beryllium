defmodule BackendWeb.GroupView do
  use BackendWeb, :view
  alias BackendWeb.GroupView

  def render("index.json", %{groups: groups}) do
    %{data: render_many(groups, GroupView, "group.json")}
  end

  def render("show.json", %{group: group}) do
    %{data: render_one(group, GroupView, "group.json")}
  end

  def render("show_all.json", %{groups: groups}) do
    %{data: render_many(groups, GroupView, "group_all.json")}
  end

  def render("group.json", %{group: group}) do
    %{id: group.id, name: group.name}
  end

  def render("group_all.json", %{group: group}) do
    %{group_id: group.group_id, group_name: group.group_name, 
    course_code: group.course_code, course_name: group.course_name, 
    section_id: group.section_id}
  end
end
