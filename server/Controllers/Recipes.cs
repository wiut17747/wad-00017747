using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Repositories;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class RecipesController : ControllerBase
{
    private readonly IRecipeRepository _recipeRepository;

    public RecipesController(IRecipeRepository recipeRepository)
    {
        _recipeRepository = recipeRepository;
    }

    [HttpPost]
    public async Task<ActionResult<Recipe>> CreateRecipe([FromForm] Recipe recipe)
    {
        Console.WriteLine($"Name: {recipe.Name}, Description: {recipe.Description}");
        var createdRecipe = await _recipeRepository.CreateRecipe(recipe);
        return CreatedAtAction(nameof(GetRecipe), new { id = createdRecipe.Id }, createdRecipe);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Recipe>> GetRecipe(int id)
    {
        var recipe = await _recipeRepository.GetRecipe(id);
        return recipe == null ? NotFound() : Ok(recipe);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Recipe>>> GetRecipes()
    {
        return Ok(await _recipeRepository.GetRecipes());
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Recipe>> DeleteRecipe(int id)
    {
        var result = await _recipeRepository.DeleteRecipe(id);
        return result ? NoContent() : NotFound();
    }
}