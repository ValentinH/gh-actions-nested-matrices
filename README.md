# GH Actions with nested matrices

This repository contains an example monorepo (created with [the official Turborepo example](https://turbo.build/repo/docs/getting-started/create-new)).
The monorepo isn't the point here: the goal is to present a technique to build Github Actions made of dynamically nested matrices.

Indeed, GH Actions allows creating matrices like documented [here](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs).
The examples only shows how to create static matrices but there are multiple blog posts explaining how to dynamically generate matrices using the `fromJSON()` function such as [this one](https://michaelheap.com/dynamic-matrix-generation-github-actions/).

However, I needed to go even further: have nested matrices with the second one being dynamic! 
Here's my use case:
1. create a matrix of each app/package to test
2. for each target, create a dynamic matrix to split the tests in multiple jobs

For a while, I thought that this was not possible because the current actions syntax doesn't allow specifying such a setup.
However, today I discovered a feature called [reusable workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflow) (never too late) which enables us to achieve what I described above! 🎉

Indeed, you can call a reusable workflow from within a matrix like this:
```yaml
  test:
    strategy:
      fail-fast: false
      matrix:
        scope: ['web', 'docs', 'ui']

    uses: ./.github/workflows/test.yml
    with:
      target: ${{ matrix.scope }}
 ```
 
 And then, you can create a dynamic matrix inside the reusable workflow! 😎
 
 The actions graph doesn't nicely renders the nested matrices (yet) but it works fine:
 <img width="642" alt="image" src="https://user-images.githubusercontent.com/2678610/201440067-df12f2e3-897d-4d30-bb8f-2887a0a88883.png">

 
test