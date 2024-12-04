using Microsoft.AspNetCore.Mvc;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class TestContoller : ControllerBase
{
    [HttpGet("hello")]
    public IActionResult GetHello()
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