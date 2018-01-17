defmodule Backend.Auth.Role do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Role

  @primary_key {:id, :binary_id, autogenerate: false}
  schema "roles" do
    field :name, :string
    field :change_course_state, :boolean
    field :manage_grades, :boolean
    field :manage_groups, :boolean
    field :manage_files, :boolean
    field :manage_pages, :boolean
    field :manage_students, :boolean
    field :manage_discussions, :boolean
    field :manage_admins, :boolean
    field :manage_courses, :boolean
    field :manage_settings, :boolean
    field :manage_announcements, :boolean
    field :manage_permissions, :boolean
    field :manage_login_details, :boolean
  end

  @doc false
  def changeset(%Role{} = role, attrs) do
    role
    |> cast(attrs, [])
    |> validate_required([])
  end
end
