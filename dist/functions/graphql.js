'use strict';

var apolloServerLambda = require('apollo-server-lambda');
var graphqlBinding = require('graphql-binding');
var shades = require('shades');
var prismaBinding = require('prisma-binding');

/**
 * Type Defs
*/
const typeDefs = `type AggregatePlaylist {
  count: Int!
}

type AggregateTrack {
  count: Int!
}

type AggregateTrackInfo {
  count: Int!
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createTrack(data: TrackCreateInput!): Track!
  createPlaylist(data: PlaylistCreateInput!): Playlist!
  createTrackInfo(data: TrackInfoCreateInput!): TrackInfo!
  updateTrack(data: TrackUpdateInput!, where: TrackWhereUniqueInput!): Track
  updatePlaylist(data: PlaylistUpdateInput!, where: PlaylistWhereUniqueInput!): Playlist
  updateTrackInfo(data: TrackInfoUpdateInput!, where: TrackInfoWhereUniqueInput!): TrackInfo
  deleteTrack(where: TrackWhereUniqueInput!): Track
  deletePlaylist(where: PlaylistWhereUniqueInput!): Playlist
  deleteTrackInfo(where: TrackInfoWhereUniqueInput!): TrackInfo
  upsertTrack(where: TrackWhereUniqueInput!, create: TrackCreateInput!, update: TrackUpdateInput!): Track!
  upsertPlaylist(where: PlaylistWhereUniqueInput!, create: PlaylistCreateInput!, update: PlaylistUpdateInput!): Playlist!
  upsertTrackInfo(where: TrackInfoWhereUniqueInput!, create: TrackInfoCreateInput!, update: TrackInfoUpdateInput!): TrackInfo!
  updateManyTracks(data: TrackUpdateInput!, where: TrackWhereInput): BatchPayload!
  updateManyPlaylists(data: PlaylistUpdateInput!, where: PlaylistWhereInput): BatchPayload!
  updateManyTrackInfoes(data: TrackInfoUpdateInput!, where: TrackInfoWhereInput): BatchPayload!
  deleteManyTracks(where: TrackWhereInput): BatchPayload!
  deleteManyPlaylists(where: PlaylistWhereInput): BatchPayload!
  deleteManyTrackInfoes(where: TrackInfoWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String

  """When paginating forwards, the cursor to continue."""
  endCursor: String
}

type Playlist implements Node {
  id: ID!
  name: String!
  tracks(where: TrackWhereInput, orderBy: TrackOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Track!]
}

"""A connection to a list of items."""
type PlaylistConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [PlaylistEdge]!
  aggregate: AggregatePlaylist!
}

input PlaylistCreateInput {
  name: String!
  tracks: TrackCreateManyWithoutPlaylistInput
}

input PlaylistCreateOneWithoutTracksInput {
  create: PlaylistCreateWithoutTracksInput
  connect: PlaylistWhereUniqueInput
}

input PlaylistCreateWithoutTracksInput {
  name: String!
}

"""An edge in a connection."""
type PlaylistEdge {
  """The item at the end of the edge."""
  node: Playlist!

  """A cursor for use in pagination."""
  cursor: String!
}

enum PlaylistOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type PlaylistPreviousValues {
  id: ID!
  name: String!
}

type PlaylistSubscriptionPayload {
  mutation: MutationType!
  node: Playlist
  updatedFields: [String!]
  previousValues: PlaylistPreviousValues
}

input PlaylistSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [PlaylistSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [PlaylistSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PlaylistSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: PlaylistWhereInput
}

input PlaylistUpdateInput {
  name: String
  tracks: TrackUpdateManyWithoutPlaylistInput
}

input PlaylistUpdateOneWithoutTracksInput {
  create: PlaylistCreateWithoutTracksInput
  connect: PlaylistWhereUniqueInput
  delete: Boolean
  update: PlaylistUpdateWithoutTracksDataInput
  upsert: PlaylistUpsertWithoutTracksInput
}

input PlaylistUpdateWithoutTracksDataInput {
  name: String
}

input PlaylistUpsertWithoutTracksInput {
  update: PlaylistUpdateWithoutTracksDataInput!
  create: PlaylistCreateWithoutTracksInput!
}

input PlaylistWhereInput {
  """Logical AND on all given filters."""
  AND: [PlaylistWhereInput!]

  """Logical OR on all given filters."""
  OR: [PlaylistWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PlaylistWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  tracks_every: TrackWhereInput
  tracks_some: TrackWhereInput
  tracks_none: TrackWhereInput
}

input PlaylistWhereUniqueInput {
  id: ID
  name: String
}

type Query {
  tracks(where: TrackWhereInput, orderBy: TrackOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Track]!
  playlists(where: PlaylistWhereInput, orderBy: PlaylistOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Playlist]!
  trackInfoes(where: TrackInfoWhereInput, orderBy: TrackInfoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TrackInfo]!
  track(where: TrackWhereUniqueInput!): Track
  playlist(where: PlaylistWhereUniqueInput!): Playlist
  trackInfo(where: TrackInfoWhereUniqueInput!): TrackInfo
  tracksConnection(where: TrackWhereInput, orderBy: TrackOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TrackConnection!
  playlistsConnection(where: PlaylistWhereInput, orderBy: PlaylistOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PlaylistConnection!
  trackInfoesConnection(where: TrackInfoWhereInput, orderBy: TrackInfoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TrackInfoConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Subscription {
  track(where: TrackSubscriptionWhereInput): TrackSubscriptionPayload
  playlist(where: PlaylistSubscriptionWhereInput): PlaylistSubscriptionPayload
  trackInfo(where: TrackInfoSubscriptionWhereInput): TrackInfoSubscriptionPayload
}

type Track implements Node {
  id: ID!
  info(where: TrackInfoWhereInput): TrackInfo!
  playlist(where: PlaylistWhereInput): Playlist!
}

"""A connection to a list of items."""
type TrackConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [TrackEdge]!
  aggregate: AggregateTrack!
}

input TrackCreateInput {
  info: TrackInfoCreateOneInput!
  playlist: PlaylistCreateOneWithoutTracksInput!
}

input TrackCreateManyWithoutPlaylistInput {
  create: [TrackCreateWithoutPlaylistInput!]
  connect: [TrackWhereUniqueInput!]
}

input TrackCreateWithoutPlaylistInput {
  info: TrackInfoCreateOneInput!
}

"""An edge in a connection."""
type TrackEdge {
  """The item at the end of the edge."""
  node: Track!

  """A cursor for use in pagination."""
  cursor: String!
}

type TrackInfo implements Node {
  id: ID!
  thumbnail: String
  title: String!
  description: String
  url: String!
  source: TrackSource!
}

"""A connection to a list of items."""
type TrackInfoConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [TrackInfoEdge]!
  aggregate: AggregateTrackInfo!
}

input TrackInfoCreateInput {
  thumbnail: String
  title: String!
  description: String
  url: String!
  source: TrackSource!
}

input TrackInfoCreateOneInput {
  create: TrackInfoCreateInput
  connect: TrackInfoWhereUniqueInput
}

"""An edge in a connection."""
type TrackInfoEdge {
  """The item at the end of the edge."""
  node: TrackInfo!

  """A cursor for use in pagination."""
  cursor: String!
}

enum TrackInfoOrderByInput {
  id_ASC
  id_DESC
  thumbnail_ASC
  thumbnail_DESC
  title_ASC
  title_DESC
  description_ASC
  description_DESC
  url_ASC
  url_DESC
  source_ASC
  source_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type TrackInfoPreviousValues {
  id: ID!
  thumbnail: String
  title: String!
  description: String
  url: String!
  source: TrackSource!
}

type TrackInfoSubscriptionPayload {
  mutation: MutationType!
  node: TrackInfo
  updatedFields: [String!]
  previousValues: TrackInfoPreviousValues
}

input TrackInfoSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [TrackInfoSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [TrackInfoSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TrackInfoSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: TrackInfoWhereInput
}

input TrackInfoUpdateDataInput {
  thumbnail: String
  title: String
  description: String
  url: String
  source: TrackSource
}

input TrackInfoUpdateInput {
  thumbnail: String
  title: String
  description: String
  url: String
  source: TrackSource
}

input TrackInfoUpdateOneInput {
  create: TrackInfoCreateInput
  connect: TrackInfoWhereUniqueInput
  delete: Boolean
  update: TrackInfoUpdateDataInput
  upsert: TrackInfoUpsertNestedInput
}

input TrackInfoUpsertNestedInput {
  update: TrackInfoUpdateDataInput!
  create: TrackInfoCreateInput!
}

input TrackInfoWhereInput {
  """Logical AND on all given filters."""
  AND: [TrackInfoWhereInput!]

  """Logical OR on all given filters."""
  OR: [TrackInfoWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TrackInfoWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  thumbnail: String

  """All values that are not equal to given value."""
  thumbnail_not: String

  """All values that are contained in given list."""
  thumbnail_in: [String!]

  """All values that are not contained in given list."""
  thumbnail_not_in: [String!]

  """All values less than the given value."""
  thumbnail_lt: String

  """All values less than or equal the given value."""
  thumbnail_lte: String

  """All values greater than the given value."""
  thumbnail_gt: String

  """All values greater than or equal the given value."""
  thumbnail_gte: String

  """All values containing the given string."""
  thumbnail_contains: String

  """All values not containing the given string."""
  thumbnail_not_contains: String

  """All values starting with the given string."""
  thumbnail_starts_with: String

  """All values not starting with the given string."""
  thumbnail_not_starts_with: String

  """All values ending with the given string."""
  thumbnail_ends_with: String

  """All values not ending with the given string."""
  thumbnail_not_ends_with: String
  title: String

  """All values that are not equal to given value."""
  title_not: String

  """All values that are contained in given list."""
  title_in: [String!]

  """All values that are not contained in given list."""
  title_not_in: [String!]

  """All values less than the given value."""
  title_lt: String

  """All values less than or equal the given value."""
  title_lte: String

  """All values greater than the given value."""
  title_gt: String

  """All values greater than or equal the given value."""
  title_gte: String

  """All values containing the given string."""
  title_contains: String

  """All values not containing the given string."""
  title_not_contains: String

  """All values starting with the given string."""
  title_starts_with: String

  """All values not starting with the given string."""
  title_not_starts_with: String

  """All values ending with the given string."""
  title_ends_with: String

  """All values not ending with the given string."""
  title_not_ends_with: String
  description: String

  """All values that are not equal to given value."""
  description_not: String

  """All values that are contained in given list."""
  description_in: [String!]

  """All values that are not contained in given list."""
  description_not_in: [String!]

  """All values less than the given value."""
  description_lt: String

  """All values less than or equal the given value."""
  description_lte: String

  """All values greater than the given value."""
  description_gt: String

  """All values greater than or equal the given value."""
  description_gte: String

  """All values containing the given string."""
  description_contains: String

  """All values not containing the given string."""
  description_not_contains: String

  """All values starting with the given string."""
  description_starts_with: String

  """All values not starting with the given string."""
  description_not_starts_with: String

  """All values ending with the given string."""
  description_ends_with: String

  """All values not ending with the given string."""
  description_not_ends_with: String
  url: String

  """All values that are not equal to given value."""
  url_not: String

  """All values that are contained in given list."""
  url_in: [String!]

  """All values that are not contained in given list."""
  url_not_in: [String!]

  """All values less than the given value."""
  url_lt: String

  """All values less than or equal the given value."""
  url_lte: String

  """All values greater than the given value."""
  url_gt: String

  """All values greater than or equal the given value."""
  url_gte: String

  """All values containing the given string."""
  url_contains: String

  """All values not containing the given string."""
  url_not_contains: String

  """All values starting with the given string."""
  url_starts_with: String

  """All values not starting with the given string."""
  url_not_starts_with: String

  """All values ending with the given string."""
  url_ends_with: String

  """All values not ending with the given string."""
  url_not_ends_with: String
  source: TrackSource

  """All values that are not equal to given value."""
  source_not: TrackSource

  """All values that are contained in given list."""
  source_in: [TrackSource!]

  """All values that are not contained in given list."""
  source_not_in: [TrackSource!]
}

input TrackInfoWhereUniqueInput {
  id: ID
  url: String
}

enum TrackOrderByInput {
  id_ASC
  id_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type TrackPreviousValues {
  id: ID!
}

enum TrackSource {
  YOUTUBE
  SOUNDCLOUD
}

type TrackSubscriptionPayload {
  mutation: MutationType!
  node: Track
  updatedFields: [String!]
  previousValues: TrackPreviousValues
}

input TrackSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [TrackSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [TrackSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TrackSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: TrackWhereInput
}

input TrackUpdateInput {
  info: TrackInfoUpdateOneInput
  playlist: PlaylistUpdateOneWithoutTracksInput
}

input TrackUpdateManyWithoutPlaylistInput {
  create: [TrackCreateWithoutPlaylistInput!]
  connect: [TrackWhereUniqueInput!]
  disconnect: [TrackWhereUniqueInput!]
  delete: [TrackWhereUniqueInput!]
  update: [TrackUpdateWithWhereUniqueWithoutPlaylistInput!]
  upsert: [TrackUpsertWithWhereUniqueWithoutPlaylistInput!]
}

input TrackUpdateWithoutPlaylistDataInput {
  info: TrackInfoUpdateOneInput
}

input TrackUpdateWithWhereUniqueWithoutPlaylistInput {
  where: TrackWhereUniqueInput!
  data: TrackUpdateWithoutPlaylistDataInput!
}

input TrackUpsertWithWhereUniqueWithoutPlaylistInput {
  where: TrackWhereUniqueInput!
  update: TrackUpdateWithoutPlaylistDataInput!
  create: TrackCreateWithoutPlaylistInput!
}

input TrackWhereInput {
  """Logical AND on all given filters."""
  AND: [TrackWhereInput!]

  """Logical OR on all given filters."""
  OR: [TrackWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TrackWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  info: TrackInfoWhereInput
  playlist: PlaylistWhereInput
}

input TrackWhereUniqueInput {
  id: ID
}
`;
const Prisma = prismaBinding.makePrismaBindingClass({ typeDefs });

var doc = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"AggregatePlaylist"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"count"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"AggregateTrack"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"count"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"AggregateTrackInfo"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"count"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"BatchPayload"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"The number of nodes that have been affected by the Batch operation.","block":true},"name":{"kind":"Name","value":"count"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Long"}}},"directives":[]}]},{"kind":"ScalarTypeDefinition","description":{"kind":"StringValue","value":"The `Long` scalar type represents non-fractional signed whole numeric values.\nLong can represent values between -(2^63) and 2^63 - 1.","block":true},"name":{"kind":"Name","value":"Long"},"directives":[]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Mutation"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"createTrack"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"data"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackCreateInput"}}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Track"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"createPlaylist"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"data"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistCreateInput"}}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"createTrackInfo"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"data"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoCreateInput"}}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfo"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"updateTrack"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"data"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackUpdateInput"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackWhereUniqueInput"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Track"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"updatePlaylist"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"data"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistUpdateInput"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistWhereUniqueInput"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"updateTrackInfo"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"data"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoUpdateInput"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoWhereUniqueInput"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfo"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"deleteTrack"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackWhereUniqueInput"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Track"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"deletePlaylist"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistWhereUniqueInput"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"deleteTrackInfo"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoWhereUniqueInput"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfo"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"upsertTrack"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackWhereUniqueInput"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"create"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackCreateInput"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"update"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackUpdateInput"}}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Track"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"upsertPlaylist"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistWhereUniqueInput"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"create"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistCreateInput"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"update"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistUpdateInput"}}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"upsertTrackInfo"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoWhereUniqueInput"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"create"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoCreateInput"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"update"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoUpdateInput"}}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfo"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"updateManyTracks"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"data"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackUpdateInput"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackWhereInput"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BatchPayload"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"updateManyPlaylists"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"data"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistUpdateInput"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistWhereInput"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BatchPayload"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"updateManyTrackInfoes"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"data"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoUpdateInput"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoWhereInput"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BatchPayload"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"deleteManyTracks"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackWhereInput"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BatchPayload"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"deleteManyPlaylists"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistWhereInput"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BatchPayload"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"deleteManyTrackInfoes"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoWhereInput"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BatchPayload"}}},"directives":[]}]},{"kind":"EnumTypeDefinition","name":{"kind":"Name","value":"MutationType"},"directives":[],"values":[{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"CREATED"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"UPDATED"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"DELETED"},"directives":[]}]},{"kind":"InterfaceTypeDefinition","description":{"kind":"StringValue","value":"An object with an ID","block":true},"name":{"kind":"Name","value":"Node"},"directives":[],"fields":[{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"The id of the object.","block":true},"name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","description":{"kind":"StringValue","value":"Information about pagination in a connection.","block":true},"name":{"kind":"Name","value":"PageInfo"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"When paginating forwards, are there more items?","block":true},"name":{"kind":"Name","value":"hasNextPage"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"When paginating backwards, are there more items?","block":true},"name":{"kind":"Name","value":"hasPreviousPage"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"When paginating backwards, the cursor to continue.","block":true},"name":{"kind":"Name","value":"startCursor"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"When paginating forwards, the cursor to continue.","block":true},"name":{"kind":"Name","value":"endCursor"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Playlist"},"interfaces":[{"kind":"NamedType","name":{"kind":"Name","value":"Node"}}],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"name"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"tracks"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackWhereInput"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"orderBy"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackOrderByInput"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"skip"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"after"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"before"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"first"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"last"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]}],"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Track"}}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","description":{"kind":"StringValue","value":"A connection to a list of items.","block":true},"name":{"kind":"Name","value":"PlaylistConnection"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Information to aid in pagination.","block":true},"name":{"kind":"Name","value":"pageInfo"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"A list of edges.","block":true},"name":{"kind":"Name","value":"edges"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistEdge"}}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"aggregate"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AggregatePlaylist"}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"PlaylistCreateInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"name"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"tracks"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackCreateManyWithoutPlaylistInput"}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"PlaylistCreateOneWithoutTracksInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"create"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistCreateWithoutTracksInput"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"connect"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistWhereUniqueInput"}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"PlaylistCreateWithoutTracksInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"name"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","description":{"kind":"StringValue","value":"An edge in a connection.","block":true},"name":{"kind":"Name","value":"PlaylistEdge"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"The item at the end of the edge.","block":true},"name":{"kind":"Name","value":"node"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"A cursor for use in pagination.","block":true},"name":{"kind":"Name","value":"cursor"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"EnumTypeDefinition","name":{"kind":"Name","value":"PlaylistOrderByInput"},"directives":[],"values":[{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"id_ASC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"id_DESC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"name_ASC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"name_DESC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"updatedAt_ASC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"updatedAt_DESC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"createdAt_ASC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"createdAt_DESC"},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"PlaylistPreviousValues"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"name"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"PlaylistSubscriptionPayload"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"mutation"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MutationType"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"node"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"updatedFields"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"previousValues"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistPreviousValues"}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"PlaylistSubscriptionWhereInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Logical AND on all given filters.","block":true},"name":{"kind":"Name","value":"AND"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistSubscriptionWhereInput"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Logical OR on all given filters.","block":true},"name":{"kind":"Name","value":"OR"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistSubscriptionWhereInput"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Logical NOT on all given filters combined by AND.","block":true},"name":{"kind":"Name","value":"NOT"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistSubscriptionWhereInput"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"The subscription event gets dispatched when it's listed in mutation_in","block":true},"name":{"kind":"Name","value":"mutation_in"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MutationType"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"The subscription event gets only dispatched when one of the updated fields names is included in this list","block":true},"name":{"kind":"Name","value":"updatedFields_contains"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"The subscription event gets only dispatched when all of the field names included in this list have been updated","block":true},"name":{"kind":"Name","value":"updatedFields_contains_every"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"The subscription event gets only dispatched when some of the field names included in this list have been updated","block":true},"name":{"kind":"Name","value":"updatedFields_contains_some"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"node"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistWhereInput"}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"PlaylistUpdateInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"name"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"tracks"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackUpdateManyWithoutPlaylistInput"}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"PlaylistUpdateOneWithoutTracksInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"create"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistCreateWithoutTracksInput"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"connect"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistWhereUniqueInput"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"delete"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"update"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistUpdateWithoutTracksDataInput"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"upsert"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistUpsertWithoutTracksInput"}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"PlaylistUpdateWithoutTracksDataInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"name"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"PlaylistUpsertWithoutTracksInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"update"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistUpdateWithoutTracksDataInput"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"create"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistCreateWithoutTracksInput"}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"PlaylistWhereInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Logical AND on all given filters.","block":true},"name":{"kind":"Name","value":"AND"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistWhereInput"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Logical OR on all given filters.","block":true},"name":{"kind":"Name","value":"OR"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistWhereInput"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Logical NOT on all given filters combined by AND.","block":true},"name":{"kind":"Name","value":"NOT"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistWhereInput"}}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are not equal to given value.","block":true},"name":{"kind":"Name","value":"id_not"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are contained in given list.","block":true},"name":{"kind":"Name","value":"id_in"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are not contained in given list.","block":true},"name":{"kind":"Name","value":"id_not_in"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values less than the given value.","block":true},"name":{"kind":"Name","value":"id_lt"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values less than or equal the given value.","block":true},"name":{"kind":"Name","value":"id_lte"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values greater than the given value.","block":true},"name":{"kind":"Name","value":"id_gt"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values greater than or equal the given value.","block":true},"name":{"kind":"Name","value":"id_gte"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values containing the given string.","block":true},"name":{"kind":"Name","value":"id_contains"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values not containing the given string.","block":true},"name":{"kind":"Name","value":"id_not_contains"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values starting with the given string.","block":true},"name":{"kind":"Name","value":"id_starts_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values not starting with the given string.","block":true},"name":{"kind":"Name","value":"id_not_starts_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values ending with the given string.","block":true},"name":{"kind":"Name","value":"id_ends_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values not ending with the given string.","block":true},"name":{"kind":"Name","value":"id_not_ends_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"name"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are not equal to given value.","block":true},"name":{"kind":"Name","value":"name_not"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are contained in given list.","block":true},"name":{"kind":"Name","value":"name_in"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are not contained in given list.","block":true},"name":{"kind":"Name","value":"name_not_in"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values less than the given value.","block":true},"name":{"kind":"Name","value":"name_lt"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values less than or equal the given value.","block":true},"name":{"kind":"Name","value":"name_lte"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values greater than the given value.","block":true},"name":{"kind":"Name","value":"name_gt"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values greater than or equal the given value.","block":true},"name":{"kind":"Name","value":"name_gte"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values containing the given string.","block":true},"name":{"kind":"Name","value":"name_contains"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values not containing the given string.","block":true},"name":{"kind":"Name","value":"name_not_contains"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values starting with the given string.","block":true},"name":{"kind":"Name","value":"name_starts_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values not starting with the given string.","block":true},"name":{"kind":"Name","value":"name_not_starts_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values ending with the given string.","block":true},"name":{"kind":"Name","value":"name_ends_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values not ending with the given string.","block":true},"name":{"kind":"Name","value":"name_not_ends_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"tracks_every"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackWhereInput"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"tracks_some"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackWhereInput"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"tracks_none"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackWhereInput"}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"PlaylistWhereUniqueInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"name"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Query"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"tracks"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackWhereInput"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"orderBy"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackOrderByInput"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"skip"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"after"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"before"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"first"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"last"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Track"}}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"playlists"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistWhereInput"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"orderBy"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistOrderByInput"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"skip"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"after"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"before"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"first"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"last"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"trackInfoes"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoWhereInput"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"orderBy"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoOrderByInput"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"skip"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"after"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"before"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"first"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"last"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfo"}}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"track"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackWhereUniqueInput"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Track"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"playlist"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistWhereUniqueInput"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"trackInfo"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoWhereUniqueInput"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfo"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"tracksConnection"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackWhereInput"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"orderBy"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackOrderByInput"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"skip"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"after"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"before"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"first"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"last"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackConnection"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"playlistsConnection"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistWhereInput"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"orderBy"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistOrderByInput"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"skip"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"after"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"before"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"first"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"last"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistConnection"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"trackInfoesConnection"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoWhereInput"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"orderBy"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoOrderByInput"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"skip"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"after"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"before"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"first"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"last"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoConnection"}}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Fetches an object given its ID","block":true},"name":{"kind":"Name","value":"node"},"arguments":[{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"The ID of an object","block":true},"name":{"kind":"Name","value":"id"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Node"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Subscription"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"track"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackSubscriptionWhereInput"}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackSubscriptionPayload"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"playlist"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistSubscriptionWhereInput"}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistSubscriptionPayload"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"trackInfo"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoSubscriptionWhereInput"}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoSubscriptionPayload"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Track"},"interfaces":[{"kind":"NamedType","name":{"kind":"Name","value":"Node"}}],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"info"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoWhereInput"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfo"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"playlist"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistWhereInput"}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","description":{"kind":"StringValue","value":"A connection to a list of items.","block":true},"name":{"kind":"Name","value":"TrackConnection"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Information to aid in pagination.","block":true},"name":{"kind":"Name","value":"pageInfo"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"A list of edges.","block":true},"name":{"kind":"Name","value":"edges"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackEdge"}}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"aggregate"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AggregateTrack"}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"TrackCreateInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"info"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoCreateOneInput"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"playlist"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistCreateOneWithoutTracksInput"}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"TrackCreateManyWithoutPlaylistInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"create"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackCreateWithoutPlaylistInput"}}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"connect"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackWhereUniqueInput"}}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"TrackCreateWithoutPlaylistInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"info"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoCreateOneInput"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","description":{"kind":"StringValue","value":"An edge in a connection.","block":true},"name":{"kind":"Name","value":"TrackEdge"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"The item at the end of the edge.","block":true},"name":{"kind":"Name","value":"node"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Track"}}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"A cursor for use in pagination.","block":true},"name":{"kind":"Name","value":"cursor"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"TrackInfo"},"interfaces":[{"kind":"NamedType","name":{"kind":"Name","value":"Node"}}],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"thumbnail"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"title"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"description"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"url"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"source"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackSource"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","description":{"kind":"StringValue","value":"A connection to a list of items.","block":true},"name":{"kind":"Name","value":"TrackInfoConnection"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Information to aid in pagination.","block":true},"name":{"kind":"Name","value":"pageInfo"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"A list of edges.","block":true},"name":{"kind":"Name","value":"edges"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoEdge"}}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"aggregate"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AggregateTrackInfo"}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"TrackInfoCreateInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"thumbnail"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"title"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"description"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"url"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"source"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackSource"}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"TrackInfoCreateOneInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"create"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoCreateInput"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"connect"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoWhereUniqueInput"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","description":{"kind":"StringValue","value":"An edge in a connection.","block":true},"name":{"kind":"Name","value":"TrackInfoEdge"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"The item at the end of the edge.","block":true},"name":{"kind":"Name","value":"node"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfo"}}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"A cursor for use in pagination.","block":true},"name":{"kind":"Name","value":"cursor"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"EnumTypeDefinition","name":{"kind":"Name","value":"TrackInfoOrderByInput"},"directives":[],"values":[{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"id_ASC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"id_DESC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"thumbnail_ASC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"thumbnail_DESC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"title_ASC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"title_DESC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"description_ASC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"description_DESC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"url_ASC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"url_DESC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"source_ASC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"source_DESC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"updatedAt_ASC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"updatedAt_DESC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"createdAt_ASC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"createdAt_DESC"},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"TrackInfoPreviousValues"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"thumbnail"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"title"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"description"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"url"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"source"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackSource"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"TrackInfoSubscriptionPayload"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"mutation"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MutationType"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"node"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfo"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"updatedFields"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"previousValues"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoPreviousValues"}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"TrackInfoSubscriptionWhereInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Logical AND on all given filters.","block":true},"name":{"kind":"Name","value":"AND"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoSubscriptionWhereInput"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Logical OR on all given filters.","block":true},"name":{"kind":"Name","value":"OR"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoSubscriptionWhereInput"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Logical NOT on all given filters combined by AND.","block":true},"name":{"kind":"Name","value":"NOT"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoSubscriptionWhereInput"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"The subscription event gets dispatched when it's listed in mutation_in","block":true},"name":{"kind":"Name","value":"mutation_in"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MutationType"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"The subscription event gets only dispatched when one of the updated fields names is included in this list","block":true},"name":{"kind":"Name","value":"updatedFields_contains"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"The subscription event gets only dispatched when all of the field names included in this list have been updated","block":true},"name":{"kind":"Name","value":"updatedFields_contains_every"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"The subscription event gets only dispatched when some of the field names included in this list have been updated","block":true},"name":{"kind":"Name","value":"updatedFields_contains_some"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"node"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoWhereInput"}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"TrackInfoUpdateDataInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"thumbnail"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"title"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"description"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"url"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"source"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackSource"}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"TrackInfoUpdateInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"thumbnail"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"title"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"description"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"url"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"source"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackSource"}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"TrackInfoUpdateOneInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"create"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoCreateInput"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"connect"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoWhereUniqueInput"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"delete"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"update"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoUpdateDataInput"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"upsert"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoUpsertNestedInput"}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"TrackInfoUpsertNestedInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"update"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoUpdateDataInput"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"create"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoCreateInput"}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"TrackInfoWhereInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Logical AND on all given filters.","block":true},"name":{"kind":"Name","value":"AND"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoWhereInput"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Logical OR on all given filters.","block":true},"name":{"kind":"Name","value":"OR"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoWhereInput"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Logical NOT on all given filters combined by AND.","block":true},"name":{"kind":"Name","value":"NOT"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoWhereInput"}}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are not equal to given value.","block":true},"name":{"kind":"Name","value":"id_not"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are contained in given list.","block":true},"name":{"kind":"Name","value":"id_in"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are not contained in given list.","block":true},"name":{"kind":"Name","value":"id_not_in"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values less than the given value.","block":true},"name":{"kind":"Name","value":"id_lt"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values less than or equal the given value.","block":true},"name":{"kind":"Name","value":"id_lte"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values greater than the given value.","block":true},"name":{"kind":"Name","value":"id_gt"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values greater than or equal the given value.","block":true},"name":{"kind":"Name","value":"id_gte"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values containing the given string.","block":true},"name":{"kind":"Name","value":"id_contains"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values not containing the given string.","block":true},"name":{"kind":"Name","value":"id_not_contains"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values starting with the given string.","block":true},"name":{"kind":"Name","value":"id_starts_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values not starting with the given string.","block":true},"name":{"kind":"Name","value":"id_not_starts_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values ending with the given string.","block":true},"name":{"kind":"Name","value":"id_ends_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values not ending with the given string.","block":true},"name":{"kind":"Name","value":"id_not_ends_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"thumbnail"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are not equal to given value.","block":true},"name":{"kind":"Name","value":"thumbnail_not"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are contained in given list.","block":true},"name":{"kind":"Name","value":"thumbnail_in"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are not contained in given list.","block":true},"name":{"kind":"Name","value":"thumbnail_not_in"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values less than the given value.","block":true},"name":{"kind":"Name","value":"thumbnail_lt"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values less than or equal the given value.","block":true},"name":{"kind":"Name","value":"thumbnail_lte"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values greater than the given value.","block":true},"name":{"kind":"Name","value":"thumbnail_gt"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values greater than or equal the given value.","block":true},"name":{"kind":"Name","value":"thumbnail_gte"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values containing the given string.","block":true},"name":{"kind":"Name","value":"thumbnail_contains"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values not containing the given string.","block":true},"name":{"kind":"Name","value":"thumbnail_not_contains"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values starting with the given string.","block":true},"name":{"kind":"Name","value":"thumbnail_starts_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values not starting with the given string.","block":true},"name":{"kind":"Name","value":"thumbnail_not_starts_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values ending with the given string.","block":true},"name":{"kind":"Name","value":"thumbnail_ends_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values not ending with the given string.","block":true},"name":{"kind":"Name","value":"thumbnail_not_ends_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"title"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are not equal to given value.","block":true},"name":{"kind":"Name","value":"title_not"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are contained in given list.","block":true},"name":{"kind":"Name","value":"title_in"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are not contained in given list.","block":true},"name":{"kind":"Name","value":"title_not_in"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values less than the given value.","block":true},"name":{"kind":"Name","value":"title_lt"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values less than or equal the given value.","block":true},"name":{"kind":"Name","value":"title_lte"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values greater than the given value.","block":true},"name":{"kind":"Name","value":"title_gt"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values greater than or equal the given value.","block":true},"name":{"kind":"Name","value":"title_gte"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values containing the given string.","block":true},"name":{"kind":"Name","value":"title_contains"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values not containing the given string.","block":true},"name":{"kind":"Name","value":"title_not_contains"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values starting with the given string.","block":true},"name":{"kind":"Name","value":"title_starts_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values not starting with the given string.","block":true},"name":{"kind":"Name","value":"title_not_starts_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values ending with the given string.","block":true},"name":{"kind":"Name","value":"title_ends_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values not ending with the given string.","block":true},"name":{"kind":"Name","value":"title_not_ends_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"description"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are not equal to given value.","block":true},"name":{"kind":"Name","value":"description_not"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are contained in given list.","block":true},"name":{"kind":"Name","value":"description_in"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are not contained in given list.","block":true},"name":{"kind":"Name","value":"description_not_in"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values less than the given value.","block":true},"name":{"kind":"Name","value":"description_lt"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values less than or equal the given value.","block":true},"name":{"kind":"Name","value":"description_lte"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values greater than the given value.","block":true},"name":{"kind":"Name","value":"description_gt"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values greater than or equal the given value.","block":true},"name":{"kind":"Name","value":"description_gte"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values containing the given string.","block":true},"name":{"kind":"Name","value":"description_contains"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values not containing the given string.","block":true},"name":{"kind":"Name","value":"description_not_contains"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values starting with the given string.","block":true},"name":{"kind":"Name","value":"description_starts_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values not starting with the given string.","block":true},"name":{"kind":"Name","value":"description_not_starts_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values ending with the given string.","block":true},"name":{"kind":"Name","value":"description_ends_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values not ending with the given string.","block":true},"name":{"kind":"Name","value":"description_not_ends_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"url"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are not equal to given value.","block":true},"name":{"kind":"Name","value":"url_not"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are contained in given list.","block":true},"name":{"kind":"Name","value":"url_in"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are not contained in given list.","block":true},"name":{"kind":"Name","value":"url_not_in"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values less than the given value.","block":true},"name":{"kind":"Name","value":"url_lt"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values less than or equal the given value.","block":true},"name":{"kind":"Name","value":"url_lte"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values greater than the given value.","block":true},"name":{"kind":"Name","value":"url_gt"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values greater than or equal the given value.","block":true},"name":{"kind":"Name","value":"url_gte"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values containing the given string.","block":true},"name":{"kind":"Name","value":"url_contains"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values not containing the given string.","block":true},"name":{"kind":"Name","value":"url_not_contains"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values starting with the given string.","block":true},"name":{"kind":"Name","value":"url_starts_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values not starting with the given string.","block":true},"name":{"kind":"Name","value":"url_not_starts_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values ending with the given string.","block":true},"name":{"kind":"Name","value":"url_ends_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values not ending with the given string.","block":true},"name":{"kind":"Name","value":"url_not_ends_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"source"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackSource"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are not equal to given value.","block":true},"name":{"kind":"Name","value":"source_not"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackSource"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are contained in given list.","block":true},"name":{"kind":"Name","value":"source_in"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackSource"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are not contained in given list.","block":true},"name":{"kind":"Name","value":"source_not_in"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackSource"}}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"TrackInfoWhereUniqueInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"url"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"EnumTypeDefinition","name":{"kind":"Name","value":"TrackOrderByInput"},"directives":[],"values":[{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"id_ASC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"id_DESC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"updatedAt_ASC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"updatedAt_DESC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"createdAt_ASC"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"createdAt_DESC"},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"TrackPreviousValues"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}]},{"kind":"EnumTypeDefinition","name":{"kind":"Name","value":"TrackSource"},"directives":[],"values":[{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"YOUTUBE"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"SOUNDCLOUD"},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"TrackSubscriptionPayload"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"mutation"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MutationType"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"node"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Track"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"updatedFields"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"previousValues"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackPreviousValues"}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"TrackSubscriptionWhereInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Logical AND on all given filters.","block":true},"name":{"kind":"Name","value":"AND"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackSubscriptionWhereInput"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Logical OR on all given filters.","block":true},"name":{"kind":"Name","value":"OR"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackSubscriptionWhereInput"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Logical NOT on all given filters combined by AND.","block":true},"name":{"kind":"Name","value":"NOT"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackSubscriptionWhereInput"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"The subscription event gets dispatched when it's listed in mutation_in","block":true},"name":{"kind":"Name","value":"mutation_in"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MutationType"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"The subscription event gets only dispatched when one of the updated fields names is included in this list","block":true},"name":{"kind":"Name","value":"updatedFields_contains"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"The subscription event gets only dispatched when all of the field names included in this list have been updated","block":true},"name":{"kind":"Name","value":"updatedFields_contains_every"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"The subscription event gets only dispatched when some of the field names included in this list have been updated","block":true},"name":{"kind":"Name","value":"updatedFields_contains_some"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"node"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackWhereInput"}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"TrackUpdateInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"info"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoUpdateOneInput"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"playlist"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistUpdateOneWithoutTracksInput"}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"TrackUpdateManyWithoutPlaylistInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"create"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackCreateWithoutPlaylistInput"}}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"connect"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackWhereUniqueInput"}}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"disconnect"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackWhereUniqueInput"}}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"delete"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackWhereUniqueInput"}}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"update"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackUpdateWithWhereUniqueWithoutPlaylistInput"}}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"upsert"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackUpsertWithWhereUniqueWithoutPlaylistInput"}}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"TrackUpdateWithoutPlaylistDataInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"info"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoUpdateOneInput"}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"TrackUpdateWithWhereUniqueWithoutPlaylistInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackWhereUniqueInput"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"data"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackUpdateWithoutPlaylistDataInput"}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"TrackUpsertWithWhereUniqueWithoutPlaylistInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"where"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackWhereUniqueInput"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"update"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackUpdateWithoutPlaylistDataInput"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"create"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackCreateWithoutPlaylistInput"}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"TrackWhereInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Logical AND on all given filters.","block":true},"name":{"kind":"Name","value":"AND"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackWhereInput"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Logical OR on all given filters.","block":true},"name":{"kind":"Name","value":"OR"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackWhereInput"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"Logical NOT on all given filters combined by AND.","block":true},"name":{"kind":"Name","value":"NOT"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackWhereInput"}}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are not equal to given value.","block":true},"name":{"kind":"Name","value":"id_not"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are contained in given list.","block":true},"name":{"kind":"Name","value":"id_in"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values that are not contained in given list.","block":true},"name":{"kind":"Name","value":"id_not_in"},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values less than the given value.","block":true},"name":{"kind":"Name","value":"id_lt"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values less than or equal the given value.","block":true},"name":{"kind":"Name","value":"id_lte"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values greater than the given value.","block":true},"name":{"kind":"Name","value":"id_gt"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values greater than or equal the given value.","block":true},"name":{"kind":"Name","value":"id_gte"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values containing the given string.","block":true},"name":{"kind":"Name","value":"id_contains"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values not containing the given string.","block":true},"name":{"kind":"Name","value":"id_not_contains"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values starting with the given string.","block":true},"name":{"kind":"Name","value":"id_starts_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values not starting with the given string.","block":true},"name":{"kind":"Name","value":"id_not_starts_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values ending with the given string.","block":true},"name":{"kind":"Name","value":"id_ends_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","description":{"kind":"StringValue","value":"All values not ending with the given string.","block":true},"name":{"kind":"Name","value":"id_not_ends_with"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"info"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackInfoWhereInput"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"playlist"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistWhereInput"}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"TrackWhereUniqueInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]}]}],"loc":{"start":0,"end":21685}};
    doc.loc.source = {"body":"# source: http://localhost:4466/\n# timestamp: Fri Oct 19 2018 16:54:09 GMT-0700 (PDT)\n\ntype AggregatePlaylist {\n  count: Int!\n}\n\ntype AggregateTrack {\n  count: Int!\n}\n\ntype AggregateTrackInfo {\n  count: Int!\n}\n\ntype BatchPayload {\n  \"\"\"The number of nodes that have been affected by the Batch operation.\"\"\"\n  count: Long!\n}\n\n\"\"\"\nThe `Long` scalar type represents non-fractional signed whole numeric values.\nLong can represent values between -(2^63) and 2^63 - 1.\n\"\"\"\nscalar Long\n\ntype Mutation {\n  createTrack(data: TrackCreateInput!): Track!\n  createPlaylist(data: PlaylistCreateInput!): Playlist!\n  createTrackInfo(data: TrackInfoCreateInput!): TrackInfo!\n  updateTrack(data: TrackUpdateInput!, where: TrackWhereUniqueInput!): Track\n  updatePlaylist(data: PlaylistUpdateInput!, where: PlaylistWhereUniqueInput!): Playlist\n  updateTrackInfo(data: TrackInfoUpdateInput!, where: TrackInfoWhereUniqueInput!): TrackInfo\n  deleteTrack(where: TrackWhereUniqueInput!): Track\n  deletePlaylist(where: PlaylistWhereUniqueInput!): Playlist\n  deleteTrackInfo(where: TrackInfoWhereUniqueInput!): TrackInfo\n  upsertTrack(where: TrackWhereUniqueInput!, create: TrackCreateInput!, update: TrackUpdateInput!): Track!\n  upsertPlaylist(where: PlaylistWhereUniqueInput!, create: PlaylistCreateInput!, update: PlaylistUpdateInput!): Playlist!\n  upsertTrackInfo(where: TrackInfoWhereUniqueInput!, create: TrackInfoCreateInput!, update: TrackInfoUpdateInput!): TrackInfo!\n  updateManyTracks(data: TrackUpdateInput!, where: TrackWhereInput): BatchPayload!\n  updateManyPlaylists(data: PlaylistUpdateInput!, where: PlaylistWhereInput): BatchPayload!\n  updateManyTrackInfoes(data: TrackInfoUpdateInput!, where: TrackInfoWhereInput): BatchPayload!\n  deleteManyTracks(where: TrackWhereInput): BatchPayload!\n  deleteManyPlaylists(where: PlaylistWhereInput): BatchPayload!\n  deleteManyTrackInfoes(where: TrackInfoWhereInput): BatchPayload!\n}\n\nenum MutationType {\n  CREATED\n  UPDATED\n  DELETED\n}\n\n\"\"\"An object with an ID\"\"\"\ninterface Node {\n  \"\"\"The id of the object.\"\"\"\n  id: ID!\n}\n\n\"\"\"Information about pagination in a connection.\"\"\"\ntype PageInfo {\n  \"\"\"When paginating forwards, are there more items?\"\"\"\n  hasNextPage: Boolean!\n\n  \"\"\"When paginating backwards, are there more items?\"\"\"\n  hasPreviousPage: Boolean!\n\n  \"\"\"When paginating backwards, the cursor to continue.\"\"\"\n  startCursor: String\n\n  \"\"\"When paginating forwards, the cursor to continue.\"\"\"\n  endCursor: String\n}\n\ntype Playlist implements Node {\n  id: ID!\n  name: String!\n  tracks(where: TrackWhereInput, orderBy: TrackOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Track!]\n}\n\n\"\"\"A connection to a list of items.\"\"\"\ntype PlaylistConnection {\n  \"\"\"Information to aid in pagination.\"\"\"\n  pageInfo: PageInfo!\n\n  \"\"\"A list of edges.\"\"\"\n  edges: [PlaylistEdge]!\n  aggregate: AggregatePlaylist!\n}\n\ninput PlaylistCreateInput {\n  name: String!\n  tracks: TrackCreateManyWithoutPlaylistInput\n}\n\ninput PlaylistCreateOneWithoutTracksInput {\n  create: PlaylistCreateWithoutTracksInput\n  connect: PlaylistWhereUniqueInput\n}\n\ninput PlaylistCreateWithoutTracksInput {\n  name: String!\n}\n\n\"\"\"An edge in a connection.\"\"\"\ntype PlaylistEdge {\n  \"\"\"The item at the end of the edge.\"\"\"\n  node: Playlist!\n\n  \"\"\"A cursor for use in pagination.\"\"\"\n  cursor: String!\n}\n\nenum PlaylistOrderByInput {\n  id_ASC\n  id_DESC\n  name_ASC\n  name_DESC\n  updatedAt_ASC\n  updatedAt_DESC\n  createdAt_ASC\n  createdAt_DESC\n}\n\ntype PlaylistPreviousValues {\n  id: ID!\n  name: String!\n}\n\ntype PlaylistSubscriptionPayload {\n  mutation: MutationType!\n  node: Playlist\n  updatedFields: [String!]\n  previousValues: PlaylistPreviousValues\n}\n\ninput PlaylistSubscriptionWhereInput {\n  \"\"\"Logical AND on all given filters.\"\"\"\n  AND: [PlaylistSubscriptionWhereInput!]\n\n  \"\"\"Logical OR on all given filters.\"\"\"\n  OR: [PlaylistSubscriptionWhereInput!]\n\n  \"\"\"Logical NOT on all given filters combined by AND.\"\"\"\n  NOT: [PlaylistSubscriptionWhereInput!]\n\n  \"\"\"\n  The subscription event gets dispatched when it's listed in mutation_in\n  \"\"\"\n  mutation_in: [MutationType!]\n\n  \"\"\"\n  The subscription event gets only dispatched when one of the updated fields names is included in this list\n  \"\"\"\n  updatedFields_contains: String\n\n  \"\"\"\n  The subscription event gets only dispatched when all of the field names included in this list have been updated\n  \"\"\"\n  updatedFields_contains_every: [String!]\n\n  \"\"\"\n  The subscription event gets only dispatched when some of the field names included in this list have been updated\n  \"\"\"\n  updatedFields_contains_some: [String!]\n  node: PlaylistWhereInput\n}\n\ninput PlaylistUpdateInput {\n  name: String\n  tracks: TrackUpdateManyWithoutPlaylistInput\n}\n\ninput PlaylistUpdateOneWithoutTracksInput {\n  create: PlaylistCreateWithoutTracksInput\n  connect: PlaylistWhereUniqueInput\n  delete: Boolean\n  update: PlaylistUpdateWithoutTracksDataInput\n  upsert: PlaylistUpsertWithoutTracksInput\n}\n\ninput PlaylistUpdateWithoutTracksDataInput {\n  name: String\n}\n\ninput PlaylistUpsertWithoutTracksInput {\n  update: PlaylistUpdateWithoutTracksDataInput!\n  create: PlaylistCreateWithoutTracksInput!\n}\n\ninput PlaylistWhereInput {\n  \"\"\"Logical AND on all given filters.\"\"\"\n  AND: [PlaylistWhereInput!]\n\n  \"\"\"Logical OR on all given filters.\"\"\"\n  OR: [PlaylistWhereInput!]\n\n  \"\"\"Logical NOT on all given filters combined by AND.\"\"\"\n  NOT: [PlaylistWhereInput!]\n  id: ID\n\n  \"\"\"All values that are not equal to given value.\"\"\"\n  id_not: ID\n\n  \"\"\"All values that are contained in given list.\"\"\"\n  id_in: [ID!]\n\n  \"\"\"All values that are not contained in given list.\"\"\"\n  id_not_in: [ID!]\n\n  \"\"\"All values less than the given value.\"\"\"\n  id_lt: ID\n\n  \"\"\"All values less than or equal the given value.\"\"\"\n  id_lte: ID\n\n  \"\"\"All values greater than the given value.\"\"\"\n  id_gt: ID\n\n  \"\"\"All values greater than or equal the given value.\"\"\"\n  id_gte: ID\n\n  \"\"\"All values containing the given string.\"\"\"\n  id_contains: ID\n\n  \"\"\"All values not containing the given string.\"\"\"\n  id_not_contains: ID\n\n  \"\"\"All values starting with the given string.\"\"\"\n  id_starts_with: ID\n\n  \"\"\"All values not starting with the given string.\"\"\"\n  id_not_starts_with: ID\n\n  \"\"\"All values ending with the given string.\"\"\"\n  id_ends_with: ID\n\n  \"\"\"All values not ending with the given string.\"\"\"\n  id_not_ends_with: ID\n  name: String\n\n  \"\"\"All values that are not equal to given value.\"\"\"\n  name_not: String\n\n  \"\"\"All values that are contained in given list.\"\"\"\n  name_in: [String!]\n\n  \"\"\"All values that are not contained in given list.\"\"\"\n  name_not_in: [String!]\n\n  \"\"\"All values less than the given value.\"\"\"\n  name_lt: String\n\n  \"\"\"All values less than or equal the given value.\"\"\"\n  name_lte: String\n\n  \"\"\"All values greater than the given value.\"\"\"\n  name_gt: String\n\n  \"\"\"All values greater than or equal the given value.\"\"\"\n  name_gte: String\n\n  \"\"\"All values containing the given string.\"\"\"\n  name_contains: String\n\n  \"\"\"All values not containing the given string.\"\"\"\n  name_not_contains: String\n\n  \"\"\"All values starting with the given string.\"\"\"\n  name_starts_with: String\n\n  \"\"\"All values not starting with the given string.\"\"\"\n  name_not_starts_with: String\n\n  \"\"\"All values ending with the given string.\"\"\"\n  name_ends_with: String\n\n  \"\"\"All values not ending with the given string.\"\"\"\n  name_not_ends_with: String\n  tracks_every: TrackWhereInput\n  tracks_some: TrackWhereInput\n  tracks_none: TrackWhereInput\n}\n\ninput PlaylistWhereUniqueInput {\n  id: ID\n  name: String\n}\n\ntype Query {\n  tracks(where: TrackWhereInput, orderBy: TrackOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Track]!\n  playlists(where: PlaylistWhereInput, orderBy: PlaylistOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Playlist]!\n  trackInfoes(where: TrackInfoWhereInput, orderBy: TrackInfoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [TrackInfo]!\n  track(where: TrackWhereUniqueInput!): Track\n  playlist(where: PlaylistWhereUniqueInput!): Playlist\n  trackInfo(where: TrackInfoWhereUniqueInput!): TrackInfo\n  tracksConnection(where: TrackWhereInput, orderBy: TrackOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TrackConnection!\n  playlistsConnection(where: PlaylistWhereInput, orderBy: PlaylistOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PlaylistConnection!\n  trackInfoesConnection(where: TrackInfoWhereInput, orderBy: TrackInfoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TrackInfoConnection!\n\n  \"\"\"Fetches an object given its ID\"\"\"\n  node(\n    \"\"\"The ID of an object\"\"\"\n    id: ID!\n  ): Node\n}\n\ntype Subscription {\n  track(where: TrackSubscriptionWhereInput): TrackSubscriptionPayload\n  playlist(where: PlaylistSubscriptionWhereInput): PlaylistSubscriptionPayload\n  trackInfo(where: TrackInfoSubscriptionWhereInput): TrackInfoSubscriptionPayload\n}\n\ntype Track implements Node {\n  id: ID!\n  info(where: TrackInfoWhereInput): TrackInfo!\n  playlist(where: PlaylistWhereInput): Playlist!\n}\n\n\"\"\"A connection to a list of items.\"\"\"\ntype TrackConnection {\n  \"\"\"Information to aid in pagination.\"\"\"\n  pageInfo: PageInfo!\n\n  \"\"\"A list of edges.\"\"\"\n  edges: [TrackEdge]!\n  aggregate: AggregateTrack!\n}\n\ninput TrackCreateInput {\n  info: TrackInfoCreateOneInput!\n  playlist: PlaylistCreateOneWithoutTracksInput!\n}\n\ninput TrackCreateManyWithoutPlaylistInput {\n  create: [TrackCreateWithoutPlaylistInput!]\n  connect: [TrackWhereUniqueInput!]\n}\n\ninput TrackCreateWithoutPlaylistInput {\n  info: TrackInfoCreateOneInput!\n}\n\n\"\"\"An edge in a connection.\"\"\"\ntype TrackEdge {\n  \"\"\"The item at the end of the edge.\"\"\"\n  node: Track!\n\n  \"\"\"A cursor for use in pagination.\"\"\"\n  cursor: String!\n}\n\ntype TrackInfo implements Node {\n  id: ID!\n  thumbnail: String\n  title: String!\n  description: String\n  url: String!\n  source: TrackSource!\n}\n\n\"\"\"A connection to a list of items.\"\"\"\ntype TrackInfoConnection {\n  \"\"\"Information to aid in pagination.\"\"\"\n  pageInfo: PageInfo!\n\n  \"\"\"A list of edges.\"\"\"\n  edges: [TrackInfoEdge]!\n  aggregate: AggregateTrackInfo!\n}\n\ninput TrackInfoCreateInput {\n  thumbnail: String\n  title: String!\n  description: String\n  url: String!\n  source: TrackSource!\n}\n\ninput TrackInfoCreateOneInput {\n  create: TrackInfoCreateInput\n  connect: TrackInfoWhereUniqueInput\n}\n\n\"\"\"An edge in a connection.\"\"\"\ntype TrackInfoEdge {\n  \"\"\"The item at the end of the edge.\"\"\"\n  node: TrackInfo!\n\n  \"\"\"A cursor for use in pagination.\"\"\"\n  cursor: String!\n}\n\nenum TrackInfoOrderByInput {\n  id_ASC\n  id_DESC\n  thumbnail_ASC\n  thumbnail_DESC\n  title_ASC\n  title_DESC\n  description_ASC\n  description_DESC\n  url_ASC\n  url_DESC\n  source_ASC\n  source_DESC\n  updatedAt_ASC\n  updatedAt_DESC\n  createdAt_ASC\n  createdAt_DESC\n}\n\ntype TrackInfoPreviousValues {\n  id: ID!\n  thumbnail: String\n  title: String!\n  description: String\n  url: String!\n  source: TrackSource!\n}\n\ntype TrackInfoSubscriptionPayload {\n  mutation: MutationType!\n  node: TrackInfo\n  updatedFields: [String!]\n  previousValues: TrackInfoPreviousValues\n}\n\ninput TrackInfoSubscriptionWhereInput {\n  \"\"\"Logical AND on all given filters.\"\"\"\n  AND: [TrackInfoSubscriptionWhereInput!]\n\n  \"\"\"Logical OR on all given filters.\"\"\"\n  OR: [TrackInfoSubscriptionWhereInput!]\n\n  \"\"\"Logical NOT on all given filters combined by AND.\"\"\"\n  NOT: [TrackInfoSubscriptionWhereInput!]\n\n  \"\"\"\n  The subscription event gets dispatched when it's listed in mutation_in\n  \"\"\"\n  mutation_in: [MutationType!]\n\n  \"\"\"\n  The subscription event gets only dispatched when one of the updated fields names is included in this list\n  \"\"\"\n  updatedFields_contains: String\n\n  \"\"\"\n  The subscription event gets only dispatched when all of the field names included in this list have been updated\n  \"\"\"\n  updatedFields_contains_every: [String!]\n\n  \"\"\"\n  The subscription event gets only dispatched when some of the field names included in this list have been updated\n  \"\"\"\n  updatedFields_contains_some: [String!]\n  node: TrackInfoWhereInput\n}\n\ninput TrackInfoUpdateDataInput {\n  thumbnail: String\n  title: String\n  description: String\n  url: String\n  source: TrackSource\n}\n\ninput TrackInfoUpdateInput {\n  thumbnail: String\n  title: String\n  description: String\n  url: String\n  source: TrackSource\n}\n\ninput TrackInfoUpdateOneInput {\n  create: TrackInfoCreateInput\n  connect: TrackInfoWhereUniqueInput\n  delete: Boolean\n  update: TrackInfoUpdateDataInput\n  upsert: TrackInfoUpsertNestedInput\n}\n\ninput TrackInfoUpsertNestedInput {\n  update: TrackInfoUpdateDataInput!\n  create: TrackInfoCreateInput!\n}\n\ninput TrackInfoWhereInput {\n  \"\"\"Logical AND on all given filters.\"\"\"\n  AND: [TrackInfoWhereInput!]\n\n  \"\"\"Logical OR on all given filters.\"\"\"\n  OR: [TrackInfoWhereInput!]\n\n  \"\"\"Logical NOT on all given filters combined by AND.\"\"\"\n  NOT: [TrackInfoWhereInput!]\n  id: ID\n\n  \"\"\"All values that are not equal to given value.\"\"\"\n  id_not: ID\n\n  \"\"\"All values that are contained in given list.\"\"\"\n  id_in: [ID!]\n\n  \"\"\"All values that are not contained in given list.\"\"\"\n  id_not_in: [ID!]\n\n  \"\"\"All values less than the given value.\"\"\"\n  id_lt: ID\n\n  \"\"\"All values less than or equal the given value.\"\"\"\n  id_lte: ID\n\n  \"\"\"All values greater than the given value.\"\"\"\n  id_gt: ID\n\n  \"\"\"All values greater than or equal the given value.\"\"\"\n  id_gte: ID\n\n  \"\"\"All values containing the given string.\"\"\"\n  id_contains: ID\n\n  \"\"\"All values not containing the given string.\"\"\"\n  id_not_contains: ID\n\n  \"\"\"All values starting with the given string.\"\"\"\n  id_starts_with: ID\n\n  \"\"\"All values not starting with the given string.\"\"\"\n  id_not_starts_with: ID\n\n  \"\"\"All values ending with the given string.\"\"\"\n  id_ends_with: ID\n\n  \"\"\"All values not ending with the given string.\"\"\"\n  id_not_ends_with: ID\n  thumbnail: String\n\n  \"\"\"All values that are not equal to given value.\"\"\"\n  thumbnail_not: String\n\n  \"\"\"All values that are contained in given list.\"\"\"\n  thumbnail_in: [String!]\n\n  \"\"\"All values that are not contained in given list.\"\"\"\n  thumbnail_not_in: [String!]\n\n  \"\"\"All values less than the given value.\"\"\"\n  thumbnail_lt: String\n\n  \"\"\"All values less than or equal the given value.\"\"\"\n  thumbnail_lte: String\n\n  \"\"\"All values greater than the given value.\"\"\"\n  thumbnail_gt: String\n\n  \"\"\"All values greater than or equal the given value.\"\"\"\n  thumbnail_gte: String\n\n  \"\"\"All values containing the given string.\"\"\"\n  thumbnail_contains: String\n\n  \"\"\"All values not containing the given string.\"\"\"\n  thumbnail_not_contains: String\n\n  \"\"\"All values starting with the given string.\"\"\"\n  thumbnail_starts_with: String\n\n  \"\"\"All values not starting with the given string.\"\"\"\n  thumbnail_not_starts_with: String\n\n  \"\"\"All values ending with the given string.\"\"\"\n  thumbnail_ends_with: String\n\n  \"\"\"All values not ending with the given string.\"\"\"\n  thumbnail_not_ends_with: String\n  title: String\n\n  \"\"\"All values that are not equal to given value.\"\"\"\n  title_not: String\n\n  \"\"\"All values that are contained in given list.\"\"\"\n  title_in: [String!]\n\n  \"\"\"All values that are not contained in given list.\"\"\"\n  title_not_in: [String!]\n\n  \"\"\"All values less than the given value.\"\"\"\n  title_lt: String\n\n  \"\"\"All values less than or equal the given value.\"\"\"\n  title_lte: String\n\n  \"\"\"All values greater than the given value.\"\"\"\n  title_gt: String\n\n  \"\"\"All values greater than or equal the given value.\"\"\"\n  title_gte: String\n\n  \"\"\"All values containing the given string.\"\"\"\n  title_contains: String\n\n  \"\"\"All values not containing the given string.\"\"\"\n  title_not_contains: String\n\n  \"\"\"All values starting with the given string.\"\"\"\n  title_starts_with: String\n\n  \"\"\"All values not starting with the given string.\"\"\"\n  title_not_starts_with: String\n\n  \"\"\"All values ending with the given string.\"\"\"\n  title_ends_with: String\n\n  \"\"\"All values not ending with the given string.\"\"\"\n  title_not_ends_with: String\n  description: String\n\n  \"\"\"All values that are not equal to given value.\"\"\"\n  description_not: String\n\n  \"\"\"All values that are contained in given list.\"\"\"\n  description_in: [String!]\n\n  \"\"\"All values that are not contained in given list.\"\"\"\n  description_not_in: [String!]\n\n  \"\"\"All values less than the given value.\"\"\"\n  description_lt: String\n\n  \"\"\"All values less than or equal the given value.\"\"\"\n  description_lte: String\n\n  \"\"\"All values greater than the given value.\"\"\"\n  description_gt: String\n\n  \"\"\"All values greater than or equal the given value.\"\"\"\n  description_gte: String\n\n  \"\"\"All values containing the given string.\"\"\"\n  description_contains: String\n\n  \"\"\"All values not containing the given string.\"\"\"\n  description_not_contains: String\n\n  \"\"\"All values starting with the given string.\"\"\"\n  description_starts_with: String\n\n  \"\"\"All values not starting with the given string.\"\"\"\n  description_not_starts_with: String\n\n  \"\"\"All values ending with the given string.\"\"\"\n  description_ends_with: String\n\n  \"\"\"All values not ending with the given string.\"\"\"\n  description_not_ends_with: String\n  url: String\n\n  \"\"\"All values that are not equal to given value.\"\"\"\n  url_not: String\n\n  \"\"\"All values that are contained in given list.\"\"\"\n  url_in: [String!]\n\n  \"\"\"All values that are not contained in given list.\"\"\"\n  url_not_in: [String!]\n\n  \"\"\"All values less than the given value.\"\"\"\n  url_lt: String\n\n  \"\"\"All values less than or equal the given value.\"\"\"\n  url_lte: String\n\n  \"\"\"All values greater than the given value.\"\"\"\n  url_gt: String\n\n  \"\"\"All values greater than or equal the given value.\"\"\"\n  url_gte: String\n\n  \"\"\"All values containing the given string.\"\"\"\n  url_contains: String\n\n  \"\"\"All values not containing the given string.\"\"\"\n  url_not_contains: String\n\n  \"\"\"All values starting with the given string.\"\"\"\n  url_starts_with: String\n\n  \"\"\"All values not starting with the given string.\"\"\"\n  url_not_starts_with: String\n\n  \"\"\"All values ending with the given string.\"\"\"\n  url_ends_with: String\n\n  \"\"\"All values not ending with the given string.\"\"\"\n  url_not_ends_with: String\n  source: TrackSource\n\n  \"\"\"All values that are not equal to given value.\"\"\"\n  source_not: TrackSource\n\n  \"\"\"All values that are contained in given list.\"\"\"\n  source_in: [TrackSource!]\n\n  \"\"\"All values that are not contained in given list.\"\"\"\n  source_not_in: [TrackSource!]\n}\n\ninput TrackInfoWhereUniqueInput {\n  id: ID\n  url: String\n}\n\nenum TrackOrderByInput {\n  id_ASC\n  id_DESC\n  updatedAt_ASC\n  updatedAt_DESC\n  createdAt_ASC\n  createdAt_DESC\n}\n\ntype TrackPreviousValues {\n  id: ID!\n}\n\nenum TrackSource {\n  YOUTUBE\n  SOUNDCLOUD\n}\n\ntype TrackSubscriptionPayload {\n  mutation: MutationType!\n  node: Track\n  updatedFields: [String!]\n  previousValues: TrackPreviousValues\n}\n\ninput TrackSubscriptionWhereInput {\n  \"\"\"Logical AND on all given filters.\"\"\"\n  AND: [TrackSubscriptionWhereInput!]\n\n  \"\"\"Logical OR on all given filters.\"\"\"\n  OR: [TrackSubscriptionWhereInput!]\n\n  \"\"\"Logical NOT on all given filters combined by AND.\"\"\"\n  NOT: [TrackSubscriptionWhereInput!]\n\n  \"\"\"\n  The subscription event gets dispatched when it's listed in mutation_in\n  \"\"\"\n  mutation_in: [MutationType!]\n\n  \"\"\"\n  The subscription event gets only dispatched when one of the updated fields names is included in this list\n  \"\"\"\n  updatedFields_contains: String\n\n  \"\"\"\n  The subscription event gets only dispatched when all of the field names included in this list have been updated\n  \"\"\"\n  updatedFields_contains_every: [String!]\n\n  \"\"\"\n  The subscription event gets only dispatched when some of the field names included in this list have been updated\n  \"\"\"\n  updatedFields_contains_some: [String!]\n  node: TrackWhereInput\n}\n\ninput TrackUpdateInput {\n  info: TrackInfoUpdateOneInput\n  playlist: PlaylistUpdateOneWithoutTracksInput\n}\n\ninput TrackUpdateManyWithoutPlaylistInput {\n  create: [TrackCreateWithoutPlaylistInput!]\n  connect: [TrackWhereUniqueInput!]\n  disconnect: [TrackWhereUniqueInput!]\n  delete: [TrackWhereUniqueInput!]\n  update: [TrackUpdateWithWhereUniqueWithoutPlaylistInput!]\n  upsert: [TrackUpsertWithWhereUniqueWithoutPlaylistInput!]\n}\n\ninput TrackUpdateWithoutPlaylistDataInput {\n  info: TrackInfoUpdateOneInput\n}\n\ninput TrackUpdateWithWhereUniqueWithoutPlaylistInput {\n  where: TrackWhereUniqueInput!\n  data: TrackUpdateWithoutPlaylistDataInput!\n}\n\ninput TrackUpsertWithWhereUniqueWithoutPlaylistInput {\n  where: TrackWhereUniqueInput!\n  update: TrackUpdateWithoutPlaylistDataInput!\n  create: TrackCreateWithoutPlaylistInput!\n}\n\ninput TrackWhereInput {\n  \"\"\"Logical AND on all given filters.\"\"\"\n  AND: [TrackWhereInput!]\n\n  \"\"\"Logical OR on all given filters.\"\"\"\n  OR: [TrackWhereInput!]\n\n  \"\"\"Logical NOT on all given filters combined by AND.\"\"\"\n  NOT: [TrackWhereInput!]\n  id: ID\n\n  \"\"\"All values that are not equal to given value.\"\"\"\n  id_not: ID\n\n  \"\"\"All values that are contained in given list.\"\"\"\n  id_in: [ID!]\n\n  \"\"\"All values that are not contained in given list.\"\"\"\n  id_not_in: [ID!]\n\n  \"\"\"All values less than the given value.\"\"\"\n  id_lt: ID\n\n  \"\"\"All values less than or equal the given value.\"\"\"\n  id_lte: ID\n\n  \"\"\"All values greater than the given value.\"\"\"\n  id_gt: ID\n\n  \"\"\"All values greater than or equal the given value.\"\"\"\n  id_gte: ID\n\n  \"\"\"All values containing the given string.\"\"\"\n  id_contains: ID\n\n  \"\"\"All values not containing the given string.\"\"\"\n  id_not_contains: ID\n\n  \"\"\"All values starting with the given string.\"\"\"\n  id_starts_with: ID\n\n  \"\"\"All values not starting with the given string.\"\"\"\n  id_not_starts_with: ID\n\n  \"\"\"All values ending with the given string.\"\"\"\n  id_ends_with: ID\n\n  \"\"\"All values not ending with the given string.\"\"\"\n  id_not_ends_with: ID\n  info: TrackInfoWhereInput\n  playlist: PlaylistWhereInput\n}\n\ninput TrackWhereUniqueInput {\n  id: ID\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

const prisma = new Prisma({
    endpoint: { "ENDPOINT": "http://localhost:4466" }.ENDPOINT,
});
function getQueries(queries) {
    const resolvers = {};
    for (const query of Object.keys(queries)) {
        resolvers[query] = graphqlBinding.forwardTo("db");
    }
    return resolvers;
}
const server = new apolloServerLambda.ApolloServer({
    typeDefs: doc,
    resolvers: {
        Query: Object.assign({}, getQueries(prisma.query), {
            tracks: (_, args, { db }, info) => {
                console.log("If you run the tracks query from the top level, you will see this print out");
                return db.query.tracks(args, info);
            }
        })
    },
    context: shades.set("db")(prisma)
});
exports.handler = server.createHandler();
