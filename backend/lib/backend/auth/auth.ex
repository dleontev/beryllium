defmodule Backend.Auth do
  @moduledoc """
  The Auth context.
  """

  import Ecto.Query

  alias Backend.Repo
  alias Backend.Auth.User
  alias Backend.Auth.Enrollment
  alias Backend.Auth.Group
  alias Backend.Auth.Groupset
  alias Backend.Auth.Role
  alias Backend.Auth.School
  alias Backend.Auth.Section
  alias Backend.Auth.Course
  alias Backend.Auth.Enrollment
  alias Backend.Auth.Group
  alias Backend.Auth.Groupset
  alias Backend.Auth.Membership
  alias Backend.Auth.Post
  alias Backend.Auth.Discussion

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Returns the list of users within the specified section.

  ## Examples

      iex> list_users_by_section(section_id)
      [%User{}, ...]

  """
  def list_users_by_section(section_id) do
    query =
      from(
        u in User,
        join: e in Enrollment,
        on: u.id == e.user_id,
        join: s in Section,
        on: e.section_id == s.id and s.id == ^section_id,
        join: c in Course,
        on: s.course_id == c.id,
        join: r in Role,
        on: e.role_id == r.id,
        order_by: [desc: u.name],
        select: {
          map(s, [:name]),
          map(u, [:id, :name]),
          map(c, [:code]),
          map(r, [:name])
        }
      )

    Enum.reduce(Repo.all(query), [], fn x, acc -> [extract_user_info(x) | acc] end)
  end

  defp extract_user_info({
         %{name: section_name},
         %{id: user_id, name: name},
         %{code: code},
         %{name: role_name}
       }) do
    %{
      section_name: section_name,
      user_id: user_id,
      name: name,
      course_code: code,
      role_name: role_name
    }
  end

  @doc """
  Returns the list of users within the specified section.

  ## Examples

      iex> list_users_by_section(section_id)
      [%User{}, ...]

  """
  def list_users_by_group(group_id) do
    Repo.all(
      from(
        u in User,
        join: m in Membership,
        on: m.user_id == u.id and m.group_id == ^group_id,
        order_by: [asc: u.name],
        select: [:id, :name, :email]
      )
    )
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Hash a password.
  """
  def hash_password(password) do
    Comeonin.Bcrypt.hashpwsalt(password)
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a User.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{source: %User{}}

  """
  def change_user(%User{} = user) do
    User.changeset(user, %{})
  end

  @doc """
  Gets a single course.

  Raises `Ecto.NoResultsError` if the Course does not exist.

  ## Examples

      iex> get_course!(123)
      %Course{}

      iex> get_course!(456)
      ** (Ecto.NoResultsError)

  """
  def get_course!(id), do: Repo.get!(Course, id)

  def get_course(section_id) do
    Repo.one(
      from(
        c in Course,
        join: s in Section,
        on: s.course_id == c.id and s.id == ^section_id,
        select: [:name, :code, :id]
      )
    )
  end

  @doc """
  Creates a course.

  ## Examples

      iex> create_course(%{field: value})
      {:ok, %Course{}}

      iex> create_course(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_course(attrs \\ %{}) do
    %Course{}
    |> Course.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a course.

  ## Examples

      iex> update_course(course, %{field: new_value})
      {:ok, %Course{}}

      iex> update_course(course, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_course(%Course{} = course, attrs) do
    course
    |> Course.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Course.

  ## Examples

      iex> delete_course(course)
      {:ok, %Course{}}

      iex> delete_course(course)
      {:error, %Ecto.Changeset{}}

  """
  def delete_course(%Course{} = course) do
    Repo.delete(course)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking course changes.

  ## Examples

      iex> change_course(course)
      %Ecto.Changeset{source: %Course{}}

  """
  def change_course(%Course{} = course) do
    Course.changeset(course, %{})
  end

  @doc """
  Returns the list of enrollments.

  ## Examples

      iex> list_enrollments()
      [%Enrollment{}, ...]

  """
  def list_enrollments do
    Repo.all(Enrollment)
  end

  @doc """
  Gets a single enrollment.

  Raises `Ecto.NoResultsError` if the Enrollment does not exist.

  ## Examples

      iex> get_enrollment!(123)
      %Enrollment{}

      iex> get_enrollment!(456)
      ** (Ecto.NoResultsError)

  """
  def get_enrollment!(id), do: Repo.get!(Enrollment, id)

  @doc """
  Creates a enrollment.

  ## Examples

      iex> create_enrollment(%{field: value})
      {:ok, %Enrollment{}}

      iex> create_enrollment(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_enrollment(attrs \\ %{}) do
    %Enrollment{}
    |> Enrollment.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a enrollment.

  ## Examples

      iex> update_enrollment(enrollment, %{field: new_value})
      {:ok, %Enrollment{}}

      iex> update_enrollment(enrollment, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_enrollment(%Enrollment{} = enrollment, attrs) do
    enrollment
    |> Enrollment.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Enrollment.

  ## Examples

      iex> delete_enrollment(enrollment)
      {:ok, %Enrollment{}}

      iex> delete_enrollment(enrollment)
      {:error, %Ecto.Changeset{}}

  """
  def delete_enrollment(%Enrollment{} = enrollment) do
    Repo.delete(enrollment)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking enrollment changes.

  ## Examples

      iex> change_enrollment(enrollment)
      %Ecto.Changeset{source: %Enrollment{}}

  """
  def change_enrollment(%Enrollment{} = enrollment) do
    Enrollment.changeset(enrollment, %{})
  end

  @doc """
  Returns the list of groups.

  ## Examples

      iex> list_groups()
      [%Group{}, ...]

  """
  def list_groups do
    Repo.all(Group)
  end

  @doc """
  Returns the list of groups for given userid.

  ## Examples

      iex> list_groups()
      [%Group{}, ...]

  """
  def list_groups(user_id) do
    query =
      from(
        g in Group,
        join: gs in Groupset,
        on: g.groupset_id == gs.id,
        join: m in Membership,
        on: m.group_id == g.id and m.user_id == ^user_id,
        join: s in Section,
        on: s.id == gs.section_id,
        join: c in Course,
        on: s.course_id == c.id,
        order_by: [desc: c.name, desc: g.name],
        select: {
          map(g, [:id, :name]),
          map(c, [:name, :code]),
          map(s, [:id])
        }
      )

    Enum.reduce(Repo.all(query), [], fn x, acc -> [extract_group_info(x) | acc] end)
  end

  defp extract_group_info({
         %{name: group_name, id: group_id},
         %{name: course_name, code: course_code},
         %{id: section_id}
       }) do
    %{
      group_id: group_id,
      group_name: group_name,
      course_name: course_name,
      course_code: course_code,
      section_id: section_id
    }
  end

  @doc """
  Returns the list of groups for given section.

  ## Examples

      iex> list_groups()
      [%Group{}, ...]

  """
  def list_groups_by_section(section_id) do
    query =
      from(
        g in Group,
        join: gs in Groupset,
        on: gs.id == g.groupset_id,
        where: g.section_id == ^section_id,
        order_by: [desc: gs.name, desc: g.name],
        select: {
          map(g, [:id, :name, :groupset_id, :max_members]),
          map(gs, [:name])
        }
      )

    Enum.reduce(Repo.all(query), [], fn x, acc -> [extract_section_group_info(x) | acc] end)
  end

  defp extract_section_group_info({
         %{id: id, name: name, groupset_id: groupset_id, max_members: max_members},
         %{name: groupset_name}
       }) do
    %{
      id: id,
      name: name,
      groupset_id: groupset_id,
      groupset_name: groupset_name,
      max_members: max_members
    }
  end

  @doc """
  Returns the list of users that belong to any group in the given section.

  ## Examples

      iex> list_groups()
      [%Group{}, ...]

  """
  def list_members_by_section(section_id) do
    query =
      from(
        u in User,
        join: m in Membership,
        on: u.id == m.user_id,
        where: m.section_id == ^section_id,
        order_by: [desc: u.name],
        select: {
          map(u, [:id, :name]),
          map(m, [:group_id])
        }
      )

    Enum.reduce(Repo.all(query), [], fn x, acc -> [extract_group_user_info(x) | acc] end)
  end

  defp extract_group_user_info({
         %{id: id, name: name},
         %{group_id: group_id}
       }) do
    %{
      id: id,
      name: name,
      group_id: group_id
    }
  end

  @doc """
  Gets a single group.

  Raises `Ecto.NoResultsError` if the Group does not exist.

  ## Examples

      iex> get_group!(123)
      %Group{}

      iex> get_group!(456)
      ** (Ecto.NoResultsError)

  """
  def get_group!(id), do: Repo.get!(Group, id)

  @doc """
  Creates a group.

  ## Examples

      iex> create_group(%{field: value})
      {:ok, %Group{}}

      iex> create_group(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_group(attrs \\ %{}) do
    %Group{}
    |> Group.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a group.

  ## Examples

      iex> update_group(group, %{field: new_value})
      {:ok, %Group{}}

      iex> update_group(group, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_group(%Group{} = group, attrs) do
    group
    |> Group.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Group.

  ## Examples

      iex> delete_group(group)
      {:ok, %Group{}}

      iex> delete_group(group)
      {:error, %Ecto.Changeset{}}

  """
  def delete_group(%Group{} = group) do
    Repo.delete(group)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking group changes.

  ## Examples

      iex> change_group(group)
      %Ecto.Changeset{source: %Group{}}

  """
  def change_group(%Group{} = group) do
    Group.changeset(group, %{})
  end

  @doc """
  Returns the list of groupsets.

  ## Examples

      iex> list_groupsets()
      [%Groupset{}, ...]

  """
  def list_groupsets do
    Repo.all(Groupset)
  end

  @doc """
  Gets a single groupset.

  Raises `Ecto.NoResultsError` if the Groupset does not exist.

  ## Examples

      iex> get_groupset!(123)
      %Groupset{}

      iex> get_groupset!(456)
      ** (Ecto.NoResultsError)

  """
  def get_groupset!(id), do: Repo.get!(Groupset, id)

  @doc """
  Creates a groupset.

  ## Examples

      iex> create_groupset(%{field: value})
      {:ok, %Groupset{}}

      iex> create_groupset(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_groupset(attrs \\ %{}) do
    %Groupset{}
    |> Groupset.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a groupset.

  ## Examples

      iex> update_groupset(groupset, %{field: new_value})
      {:ok, %Groupset{}}

      iex> update_groupset(groupset, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_groupset(%Groupset{} = groupset, attrs) do
    groupset
    |> Groupset.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Groupset.

  ## Examples

      iex> delete_groupset(groupset)
      {:ok, %Groupset{}}

      iex> delete_groupset(groupset)
      {:error, %Ecto.Changeset{}}

  """
  def delete_groupset(%Groupset{} = groupset) do
    Repo.delete(groupset)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking groupset changes.

  ## Examples

      iex> change_groupset(groupset)
      %Ecto.Changeset{source: %Groupset{}}

  """
  def change_groupset(%Groupset{} = groupset) do
    Groupset.changeset(groupset, %{})
  end

  alias Backend.Auth.Role

  @doc """
  Returns the list of roles.

  ## Examples

      iex> list_roles()
      [%Role{}, ...]

  """
  def list_roles do
    Repo.all(Role)
  end

  @doc """
  Gets a single role.

  Raises `Ecto.NoResultsError` if the Role does not exist.

  ## Examples

      iex> get_role!(123)
      %Role{}

      iex> get_role!(456)
      ** (Ecto.NoResultsError)

  """
  def get_role!(id), do: Repo.get!(Role, id)

  @doc """
  Creates a role.

  ## Examples

      iex> create_role(%{field: value})
      {:ok, %Role{}}

      iex> create_role(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_role(attrs \\ %{}) do
    %Role{}
    |> Role.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a role.

  ## Examples

      iex> update_role(role, %{field: new_value})
      {:ok, %Role{}}

      iex> update_role(role, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_role(%Role{} = role, attrs) do
    role
    |> Role.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Role.

  ## Examples

      iex> delete_role(role)
      {:ok, %Role{}}

      iex> delete_role(role)
      {:error, %Ecto.Changeset{}}

  """
  def delete_role(%Role{} = role) do
    Repo.delete(role)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking role changes.

  ## Examples

      iex> change_role(role)
      %Ecto.Changeset{source: %Role{}}

  """
  def change_role(%Role{} = role) do
    Role.changeset(role, %{})
  end

  alias Backend.Auth.School

  @doc """
  Returns the list of schools.

  ## Examples

      iex> list_schools()
      [%School{}, ...]

  """
  def list_schools do
    Repo.all(School)
  end

  @doc """
  Gets a single school.

  Raises `Ecto.NoResultsError` if the School does not exist.

  ## Examples

      iex> get_school!(123)
      %School{}

      iex> get_school!(456)
      ** (Ecto.NoResultsError)

  """
  def get_school!(id), do: Repo.get!(School, id)

  @doc """
  Creates a school.

  ## Examples

      iex> create_school(%{field: value})
      {:ok, %School{}}

      iex> create_school(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_school(attrs \\ %{}) do
    %School{}
    |> School.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a school.

  ## Examples

      iex> update_school(school, %{field: new_value})
      {:ok, %School{}}

      iex> update_school(school, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_school(%School{} = school, attrs) do
    school
    |> School.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a School.

  ## Examples

      iex> delete_school(school)
      {:ok, %School{}}

      iex> delete_school(school)
      {:error, %Ecto.Changeset{}}

  """
  def delete_school(%School{} = school) do
    Repo.delete(school)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking school changes.

  ## Examples

      iex> change_school(school)
      %Ecto.Changeset{source: %School{}}

  """
  def change_school(%School{} = school) do
    School.changeset(school, %{})
  end

  alias Backend.Auth.Section

  @doc """
  Returns the list of sections.

  ## Examples

      iex> list_sections()
      [%Section{}, ...]

  """
  def list_sections do
    Repo.all(Section)
  end

  @doc """
  Gets a single section.

  Raises `Ecto.NoResultsError` if the Section does not exist.

  ## Examples

      iex> get_section!(123)
      %Section{}

      iex> get_section!(456)
      ** (Ecto.NoResultsError)

  """
  def get_section!(id), do: Repo.get!(Section, id)

  @doc """
  Creates a section.

  ## Examples

      iex> create_section(%{field: value})
      {:ok, %Section{}}

      iex> create_section(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_section(attrs \\ %{}) do
    %Section{}
    |> Section.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a section.

  ## Examples

      iex> update_section(section, %{field: new_value})
      {:ok, %Section{}}

      iex> update_section(section, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_section(%Section{} = section, attrs) do
    section
    |> Section.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Section.

  ## Examples

      iex> delete_section(section)
      {:ok, %Section{}}

      iex> delete_section(section)
      {:error, %Ecto.Changeset{}}

  """
  def delete_section(%Section{} = section) do
    Repo.delete(section)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking section changes.

  ## Examples

      iex> change_section(section)
      %Ecto.Changeset{source: %Section{}}

  """
  def change_section(%Section{} = section) do
    Section.changeset(section, %{})
  end

  @doc """
  Returns a combined courses query.
  """
  def list_courses(user_id) do
    query =
      from(
        u in User,
        join: e in Enrollment,
        on: u.id == e.user_id and u.id == ^user_id,
        join: s in Section,
        on: e.section_id == s.id,
        join: c in Course,
        on: s.course_id == c.id,
        join: r in Role,
        on: e.role_id == r.id,
        order_by: [desc: c.code],
        select: {
          map(s, [:name, :id, :published]),
          map(c, [:id, :code, :name, :start_date, :end_date]),
          map(r, [:name])
        }
      )

    Enum.reduce(Repo.all(query), [], fn x, acc -> [extract_course_info(x) | acc] end)
  end

  defp extract_course_info({
         %{name: section_name, id: section_id, published: published},
         %{id: id, end_date: end_date, code: code, name: name, start_date: start_date},
         %{name: role_name}
       }) do
    %{
      section_name: section_name,
      section_id: section_id,
      published: published,
      id: id,
      course_code: code,
      course_name: name,
      start_date: start_date,
      end_date: end_date,
      role_name: role_name
    }
  end

  @doc """
  Returns the discussions/announcements for the given sections.
  """
  def list_discussions(section_id, is_discussion) do
    query =
      from(
        d in Discussion,
        join: p in Post,
        on: p.discussion_id == d.id and is_nil(p.parent_id),
        join: u in User,
        on: u.id == p.user_id,
        order_by: p.inserted_at,
        where: d.section_id == ^section_id and d.is_discussion == ^is_discussion,
        select: {
          map(d, [:title, :id, :is_locked]),
          map(p, [:content, :inserted_at, :updated_at]),
          map(u, [:id, :name])
        }
      )

    Enum.reduce(Repo.all(query), [], fn x, acc -> [extract_discussion_info(x) | acc] end)
  end

  defp extract_discussion_info({
         %{title: title, id: id, is_locked: is_locked},
         %{content: content, inserted_at: inserted_at, updated_at: updated_at},
         %{name: author_name, id: author_id}
       }) do
    %{
      title: title,
      id: id,
      content: content,
      is_locked: is_locked,
      inserted_at: inserted_at,
      updated_at: updated_at,
      author_name: author_name,
      author_id: author_id
    }
  end

  @doc """
  Returns the posts for the given discussions/announcements.
  """
  def list_posts_by_discussion(discussion_id) do
    query =
      from(
        p in Post,
        join: u in User,
        on: u.id == p.user_id,
        where: p.discussion_id == ^discussion_id,
        order_by: p.updated_at,
        select: {
          map(p, [:id, :inserted_at, :updated_at, :content, :parent_id]),
          map(u, [:name])
        }
      )

    Enum.reduce(Repo.all(query), [], fn x, acc -> [extract_post_info(x) | acc] end)
  end

  def list_posts_by_parent(post_id) do
    query = from p in Post,
    join: u in User,
    on: p.user_id == u.id,
    where: p.parent_id == ^post_id,
    order_by: p.inserted_at,
    select: {
      map(p, [:id, :inserted_at, :updated_at, :content, :parent_id, :user_id, :is_deleted]),
      map(u, [:name])
    }
    Enum.reduce(Repo.all(query), [], fn(x, acc) -> [extract_post_info_with_user_id(x) | acc] end)
  end

  defp extract_post_info({
         %{
           id: id,
           inserted_at: inserted_at,
           updated_at: updated_at,
           content: content,
           parent_id: parent_id
         },
         %{name: author_name}
       }) do
    %{
      id: id,
      content: content,
      inserted_at: inserted_at,
      parent_id: parent_id,
      updated_at: updated_at,
      author_name: author_name
    }
  end


  defp extract_post_info_with_user_id({
         %{
           id: id,
           inserted_at: inserted_at,
           updated_at: updated_at,
           content: content,
           parent_id: parent_id,
           user_id: user_id,
           is_deleted: is_deleted
         },
         %{name: author_name}
       }) do
    %{
      id: id,
      content: content,
      inserted_at: inserted_at,
      parent_id: parent_id,
      user_id: user_id,
      is_deleted: is_deleted,
      updated_at: updated_at,
      author_name: author_name
    }
  end

  @doc """
  Returns the list of posts.

  ## Examples

      iex> list_posts()
      [%Post{}, ...]

  """
  def list_posts do
    Repo.all(Post)
  end

  @doc """
  Gets a single post.

  Raises `Ecto.NoResultsError` if the Post does not exist.

  ## Examples

      iex> get_post!(123)
      %Post{}

      iex> get_post!(456)
      ** (Ecto.NoResultsError)

  """
  def get_post!(id), do: Repo.get!(Post, id)

  def get_post_by_discussion_id(discussion_id) do
    query =
    from p in Post,
    join: u in User,
    on: p.user_id == u.id,
    where: p.discussion_id == ^discussion_id and is_nil(p.parent_id),
    select: {
      map(p, [:id, :inserted_at, :updated_at, :content, :parent_id]),
      map(u, [:name])
    }
    Enum.reduce(Repo.all(query), [], fn(x, acc) -> [extract_post_info(x) | acc] end)
  end

  def get_children_of_discussion(discussion_id) do
    query = from p in Post,
    where: p.discussion_id == ^discussion_id and not is_nil(p.parent_id),
    select: count(p.id)
    Repo.all(query)
  end

  @doc """
  Creates a post.

  ## Examples

      iex> create_post(%{field: value})
      {:ok, %Post{}}

      iex> create_post(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_post(attrs \\ %{}) do
    %Post{}
    |> Post.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a post.

  ## Examples

      iex> update_post(post, %{field: new_value})
      {:ok, %Post{}}

      iex> update_post(post, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_post(%Post{} = post, attrs) do
    post
    |> Post.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Post.

  ## Examples

      iex> delete_post(post)
      {:ok, %Post{}}

      iex> delete_post(post)
      {:error, %Ecto.Changeset{}}

  """
  def delete_post(%Post{} = post) do
    Repo.delete(post)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking post changes.

  ## Examples

      iex> change_post(post)
      %Ecto.Changeset{source: %Post{}}

  """
  def change_post(%Post{} = post) do
    Post.changeset(post, %{})
  end

  @doc """
  Returns the list of membership.

  ## Examples

      iex> list_membership()
      [%Memberships{}, ...]

  """
  def list_membership do
    Repo.all(Membership)
  end

  @doc """
  Gets a single memberships.

  Raises `Ecto.NoResultsError` if the Memberships does not exist.

  ## Examples

      iex> get_memberships!(123)
      %Memberships{}

      iex> get_memberships!(456)
      ** (Ecto.NoResultsError)

  """
  def get_memberships!(id), do: Repo.get!(Membership, id)

  @doc """
  Creates a memberships.

  ## Examples

      iex> create_memberships(%{field: value})
      {:ok, %Memberships{}}

      iex> create_memberships(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_memberships(attrs \\ %{}) do
    %Membership{}
    |> Membership.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a memberships.

  ## Examples

      iex> update_memberships(memberships, %{field: new_value})
      {:ok, %Memberships{}}

      iex> update_memberships(memberships, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_memberships(%Membership{} = memberships, attrs) do
    memberships
    |> Membership.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Memberships.

  ## Examples

      iex> delete_memberships(memberships)
      {:ok, %Memberships{}}

      iex> delete_memberships(memberships)
      {:error, %Ecto.Changeset{}}

  """
  def delete_memberships(%Membership{} = memberships) do
    Repo.delete(memberships)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking memberships changes.

  ## Examples

      iex> change_memberships(memberships)
      %Ecto.Changeset{source: %Memberships{}}

  """
  def change_memberships(%Membership{} = memberships) do
    Membership.changeset(memberships, %{})
  end

  @doc """
  Returns the list of discussions.

  ## Examples

      iex> list_discussions()
      [%Discussion{}, ...]

  """
  def list_discussions do
    Repo.all(Discussion)
  end

  @doc """
  Gets a single discussion.

  Raises `Ecto.NoResultsError` if the Discussion does not exist.

  ## Examples

      iex> get_discussion!(123)
      %Discussion{}

      iex> get_discussion!(456)
      ** (Ecto.NoResultsError)

  """
  def get_discussion!(id), do: Repo.get!(Discussion, id)

  @doc """
  Creates a discussion.

  ## Examples

      iex> create_discussion(%{field: value})
      {:ok, %Discussion{}}

      iex> create_discussion(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_discussion(attrs \\ %{}) do
    %Discussion{}
    |> Discussion.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a discussion.

  ## Examples

      iex> update_discussion(discussion, %{field: new_value})
      {:ok, %Discussion{}}

      iex> update_discussion(discussion, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_discussion(%Discussion{} = discussion, attrs) do
    discussion
    |> Discussion.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Discussion.

  ## Examples

      iex> delete_discussion(discussion)
      {:ok, %Discussion{}}

      iex> delete_discussion(discussion)
      {:error, %Ecto.Changeset{}}

  """
  def delete_discussion(%Discussion{} = discussion) do
    Repo.delete(discussion)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking discussion changes.

  ## Examples

      iex> change_discussion(discussion)
      %Ecto.Changeset{source: %Discussion{}}

  """
  def change_discussion(%Discussion{} = discussion) do
    Discussion.changeset(discussion, %{})
  end
end
