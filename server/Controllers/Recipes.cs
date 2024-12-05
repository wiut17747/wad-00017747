using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class RecipesController : ControllerBase
{
    private readonly AppDbContext _context;

    public RecipesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<Recipe>> CreateRecipe([FromForm] Recipe recipe)
    {
        Console.WriteLine($"Name: {recipe.Name}, Description: {recipe.Description}");
        _context.Recipes.Add(recipe);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetRecipe), new { id = recipe.Id }, recipe);
    }

    {
        return Ok("Hello");
    }
}
// public class RecipesController : ControllerBase
// {
//     private static readonly List<Recipe> _recipes = new()
//     {
//         new Recipe { Id = 1, Name = "recipe 1" }
//     };
//
//     [HttpGet]
//     public ActionResult<IEnumerable<Recipe>> GetRecipes()
//     {
//         return Ok(_recipes);
//     }
//
//     [HttpGet("{id}")]
//     public ActionResult<Recipe> GetRecipe(int id)
//     {
//         var recipe = _recipes.FirstOrDefault(r => r.Id == id);
//         if (recipe == null) return NotFound();
//
//         return Ok(recipe);
//     }
//
//     [HttpPost]
//     public ActionResult<Recipe> CreateRecipe(Recipe recipe)
//     {
//         recipe.Id = _recipes.Count + 1;
//         _recipes.Add(recipe);
//
//         return CreatedAtAction(nameof(GetRecipe), new { id = recipe.Id }, recipe);
//     }
// }