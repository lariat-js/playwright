% Enforce that a workspace MUST depend on the same version of a dependency as
% the one used by the other workspaces.
gen_enforced_dependency(WorkspaceCwd, DependencyIdent, DependencyRange2, DependencyType) :-
  % Iterates over all dependencies from all workspaces
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, DependencyRange, DependencyType),
  % Iterates over similarly-named dependencies from all workspaces (again)
  workspace_has_dependency(WorkspaceCwd2, DependencyIdent, DependencyRange2, DependencyType2),
  % Ignore private workspaces (the root workspace). This allows the root
  % workspace to use workspace:* ranges for depending on internal packages.
  \+ workspace_field(WorkspaceCwd, 'private', true),
  \+ workspace_field(WorkspaceCwd2, 'private', true),
  % Ignores peer dependencies
  DependencyType \= 'peerDependencies',
  DependencyType2 \= 'peerDependencies'.

% Require all packages to have an exports field
gen_enforced_field(WorkspaceCwd, 'exports', './lib/index.js') :-
  % Ignore private workspaces
  \+ workspace_field(WorkspaceCwd, 'private', true).

% Require all packages to have a types field
gen_enforced_field(WorkspaceCwd, 'types', './lib/index.d.ts') :-
  % Ignore private workspaces
  \+ workspace_field(WorkspaceCwd, 'private', true).

% Require all packages to have a files array
gen_enforced_field(WorkspaceCwd, 'files', []) :-
  % Ignore private workspaces
  \+ workspace_field(WorkspaceCwd, 'private', true),
  % Ignore packages that already have a files array
  \+ workspace_field(WorkspaceCwd, 'files', _).

% Require all packages to be ISC licensed
gen_enforced_field(WorkspaceCwd, 'license', 'ISC').

% Require all packages to have the author of Widen
gen_enforced_field(WorkspaceCwd, 'author', 'Widen').

% Require all packages to have a home page URL
gen_enforced_field(WorkspaceCwd, 'homepage', Homepage) :-
  % Ignore private workspaces
  \+ workspace_field(WorkspaceCwd, 'private', true),
  % Construct the homepage URL from the workspace directory
  atom_concat('https://github.com/Widen/lariat/blob/main/', WorkspaceCwd, BaseUrl),
  atom_concat(BaseUrl, '#readme', Homepage).

% Require all packages to have the correct repository details
gen_enforced_field(WorkspaceCwd, 'repository.type', 'git').
gen_enforced_field(WorkspaceCwd, 'repository.url', 'https://github.com/Widen/lariat').
gen_enforced_field(WorkspaceCwd, 'repository.directory', WorkspaceCwd).
